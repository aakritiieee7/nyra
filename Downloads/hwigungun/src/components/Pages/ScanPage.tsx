import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Upload, Camera, X } from 'lucide-react';
import ScoreCard from '../UI/ScoreCard';
import LoadingSpinner from '../UI/LoadingSpinner';
import * as tmImage from '@teachablemachine/image';
import { ScanResult } from '../../types';

const staticMaterialData: Record<string, any> = {
  // [same material info as before]
  plastic: {
    eco_score: "C", grade: "C", layers: 1, recyclability: 0.5,
    note: "Widespread use but poor degradation.",
    disposal: "Recycle if local facility accepts.",
    impact: "500 kg of plastic avoided per 1000 users/year",
    suggestion: "Try switching to paper or reusable alternatives."
  },
  paper: {
    eco_score: "A", grade: "A", layers: 1, recyclability: 0.85,
    note: "Easily biodegradable and recyclable.",
    disposal: "Dry waste bin or compost if clean.",
    impact: "Excellent choice- minimal impact",
    suggestion: "Keep using sustainable packaging!"
  },
  glass: {
    eco_score: "B", grade: "B", layers: 1, recyclability: 0.9,
    note: "Highly recyclable but energy-intensive.",
    disposal: "Recycle separately.",
    impact: "Energy-intensive but reusable",
    suggestion: "Reuse glass jars and bottles"
  },
  cardboard: {
    eco_score: "A", grade: "A", layers: 1, recyclability: 0.8,
    note: "Biodegradable and compostable.",
    disposal: "Compost or recycle clean cardboard.",
    impact: "Minimal packaging footprint",
    suggestion: "Use recycled cardboard variants"
  },
  metal: {
    eco_score: "B", grade: "B", layers: 1, recyclability: 0.8,
    note: "Good recyclability, durable.",
    disposal: "Recycle in dry waste.",
    impact: "High mining impact- recycle always",
    suggestion: "Choose aluminum over steel if possible"
  }
};

const ScanPage: React.FC = () => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    else if (e.type === "dragleave") setDragActive(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('image/')) {
        setUploadedFile(file);
        setScanResult(null);
      }
    }
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type.startsWith('image/')) {
        setUploadedFile(file);
        setScanResult(null);
      }
    }
  };

  const handleAnalyze = async () => {
    if (!uploadedFile) return;
    setIsAnalyzing(true);
    try {
      const modelURL = "https://teachablemachine.withgoogle.com/models/b3tXKkjZ9/";
      const model = await tmImage.load(modelURL + "model.json", modelURL + "metadata.json");

      const img = new Image();
      img.src = URL.createObjectURL(uploadedFile);
      await img.decode();

      const prediction = await model.predict(img);
      prediction.sort((a: any, b: any) => b.probability - a.probability);
      const top = prediction[0];
      const materialKey = top.className.toLowerCase();
      const extraInfo = staticMaterialData[materialKey];

      const result = {
        material: top.className,
        confidence: Math.round(top.probability * 100),
        score: extraInfo?.eco_score || "C",
        summary: extraInfo?.note || "No info available.",
        recommendations: [extraInfo?.suggestion || "Try alternatives."],
        recyclability: extraInfo?.recyclability,
        disposal: extraInfo?.disposal,
        impact: extraInfo?.impact,
      };

      setScanResult(result);
    } catch (err) {
      console.error("❌ Model analysis failed:", err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const startCamera = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    streamRef.current = stream;

    setIsCameraActive(true); // 💡 This renders the <video> element

    // ⏳ Wait briefly for React to render the <video> element
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      } else {
        console.warn("⚠️ videoRef.current is null after timeout");
      }
    }, 100); // 100ms delay works in most cases

    setUploadedFile(null);
    setScanResult(null);
  } catch (error) {
    console.error("❌ Error accessing webcam:", error);
  }
};


  const stopCamera = () => {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    setIsCameraActive(false);
  };

  const captureFromCamera = async () => {
    if (!videoRef.current) return;
    setIsAnalyzing(true);
    try {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext('2d');
      ctx?.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

      const modelURL = "https://teachablemachine.withgoogle.com/models/b3tXKkjZ9/";
      const model = await tmImage.load(modelURL + "model.json", modelURL + "metadata.json");
      const prediction = await model.predict(canvas);
      prediction.sort((a: any, b: any) => b.probability - a.probability);
      const top = prediction[0];
      const materialKey = top.className.toLowerCase();
      const extraInfo = staticMaterialData[materialKey];

      const result = {
        material: top.className,
        confidence: Math.round(top.probability * 100),
        score: extraInfo?.eco_score || "C",
        summary: extraInfo?.note || "No info available.",
        recommendations: [extraInfo?.suggestion || "Try alternatives."],
        recyclability: extraInfo?.recyclability,
        disposal: extraInfo?.disposal,
        impact: extraInfo?.impact,
      };

      setScanResult(result);
      stopCamera(); // Optional: auto-close after capture
    } catch (err) {
      console.error("❌ Webcam capture failed:", err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleReset = () => {
    setUploadedFile(null);
    setScanResult(null);
    setIsAnalyzing(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Packaging Analysis</h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Upload an image or use your camera to get instant AI-powered sustainability analysis
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upload/Webcam Area */}
          <div className="space-y-6">
            <div
              className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 ${
                dragActive
                  ? 'border-[#00EB88] bg-green-50'
                  : uploadedFile
                  ? 'border-green-400 bg-green-50'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              {isCameraActive ? (
                <div className="space-y-4">
                  <video ref={videoRef} className="w-full max-h-64 mx-auto rounded-lg" autoPlay playsInline muted />
                  <div className="flex justify-center gap-4">
                    <button onClick={captureFromCamera} className="bg-[#00EB88] text-black font-semibold py-2 px-4 rounded hover:bg-green-400">
                      Capture & Analyze
                    </button>
                    <button onClick={stopCamera} className="py-2 px-4 border border-gray-300 rounded hover:bg-gray-100">
                      Close Camera
                    </button>
                  </div>
                </div>
              ) : uploadedFile ? (
                <div className="space-y-4">
                  <img src={URL.createObjectURL(uploadedFile)} alt="Uploaded" className="max-h-48 mx-auto rounded-lg object-cover" />
                  <div className="flex items-center justify-center space-x-2">
                    <span className="text-sm text-gray-600">{uploadedFile.name}</span>
                    <button onClick={handleReset} className="text-red-500 hover:text-red-700">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto" />
                  <div>
                    <p className="text-lg font-medium text-gray-900">Drop your packaging image here</p>
                    <p className="text-gray-500">or click to browse</p>
                  </div>
                  <input type="file" accept="image/*" onChange={handleFileSelect} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                </div>
              )}
            </div>

            <div className="flex space-x-4">
              <button
                onClick={handleAnalyze}
                disabled={!uploadedFile || isAnalyzing}
                className="flex-1 bg-[#00EB88] text-black font-semibold py-3 px-6 rounded-lg hover:bg-green-400 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isAnalyzing ? 'Analyzing...' : 'Analyze Packaging'}
              </button>
              <button onClick={startCamera} className="px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50">
                <Camera className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            <div className="text-xs text-gray-500 text-center">Supported formats: JPG, PNG, WebP (max 10MB)</div>
          </div>

          {/* Results Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Analysis Results</h3>
            {isAnalyzing ? (
              <LoadingSpinner />
            ) : scanResult ? (
              <ScoreCard
                material={scanResult.material}
                score={scanResult.score}
                summary={scanResult.summary}
                confidence={scanResult.confidence}
                recommendations={scanResult.recommendations}
                recyclability={scanResult.recyclability}
                disposal={scanResult.disposal}
                impact={scanResult.impact}
              />
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Camera className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-gray-500">Upload or capture an image to see analysis results</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScanPage;
