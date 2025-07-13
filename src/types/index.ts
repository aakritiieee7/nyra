export interface ScanResult {
  material: string;
  score: string;
  summary: string;
  confidence: number;
  recommendations: string[];
  recyclability: number;  // ✅ Add this line
  disposal: string;       // ✅ Add this line
  impact: string;         // ✅ Add this line
}

export interface ScanHistory {
  id: number;
  date: string;
  material: string;
  score: string;
  confidence: number;
}

export interface MaterialDistribution {
  labels: string[];
  values: number[];
  colors: string[];
}

export interface TeamMember {
  id: number;
  name: string;
  role: string;
  image: string;
  social: {
    linkedin?: string;
    twitter?: string;
    github?: string;
  };
}