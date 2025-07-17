import axios from 'axios';
import { ScanResult, ScanHistory, MaterialDistribution } from '../types';

const BASE_URL = '/mock-api';

export const api = {
  async getScanResult(): Promise<ScanResult> {
    const response = await axios.get(`${BASE_URL}/scan-response.json`);
    return response.data;
  },

  async getScanHistory(): Promise<ScanHistory[]> {
    const response = await axios.get(`${BASE_URL}/scan-history.json`);
    return response.data;
  },

  async getMaterialDistribution(): Promise<MaterialDistribution> {
    const response = await axios.get(`${BASE_URL}/material-distribution.json`);
    return response.data.data;
  },

  async uploadImage(file: File): Promise<ScanResult> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock random response based on file name
    const mockResponses = [
      {
        material: "Plastic Bottle",
        score: "D",
        summary: "High environmental impact packaging. Consider switching to recycled plastic or glass alternatives.",
        confidence: 94,
        recommendations: [
          "Switch to recycled plastic bottles (rPET)",
          "Consider glass or aluminum alternatives",
          "Reduce packaging thickness where possible"
        ]
      },
      {
        material: "Cardboard Box",
        score: "B",
        summary: "Good sustainable choice. Biodegradable and recyclable, but watch out for plastic coatings.",
        confidence: 89,
        recommendations: [
          "Use uncoated, recyclable cardboard",
          "Minimize ink and adhesive usage",
          "Consider right-sizing to reduce waste"
        ]
      },
      {
        material: "Glass Jar",
        score: "A",
        summary: "Excellent choice! Glass is infinitely recyclable with minimal environmental impact.",
        confidence: 96,
        recommendations: [
          "Continue using glass packaging",
          "Optimize weight to reduce transport emissions",
          "Encourage reuse and refill programs"
        ]
      }
    ];

    const randomIndex = Math.floor(Math.random() * mockResponses.length);
    return mockResponses[randomIndex];
  }
};