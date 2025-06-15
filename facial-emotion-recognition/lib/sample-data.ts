export const modelPerformanceData = {
  emotionAccuracy: [
    { emotion: "happiness", accuracy: 0.87 }, // Best performing (f1: 0.88)
    { emotion: "surprise", accuracy: 0.74 }, // Second best (recall: 0.74)
    { emotion: "neutral", accuracy: 0.71 }, // Third (recall: 0.71)
    { emotion: "anger", accuracy: 0.71 }, // Fourth (recall: 0.71)
    { emotion: "disgust", accuracy: 0.58 }, // Fifth (recall: 0.58)
    { emotion: "fear", accuracy: 0.53 }, // Sixth (recall: 0.53)
    { emotion: "sadness", accuracy: 0.46 }, // Most challenging (recall: 0.46)
  ],

  detailedMetrics: [
    { emotion: "anger", precision: 0.51, recall: 0.71, f1: 0.6, support: 495 },
    { emotion: "disgust", precision: 0.71, recall: 0.58, f1: 0.64, support: 55 },
    { emotion: "fear", precision: 0.59, recall: 0.53, f1: 0.56, support: 512 },
    { emotion: "happiness", precision: 0.88, recall: 0.87, f1: 0.88, support: 899 },
    { emotion: "sadness", precision: 0.62, recall: 0.46, f1: 0.53, support: 608 },
    { emotion: "surprise", precision: 0.85, recall: 0.74, f1: 0.79, support: 400 },
    { emotion: "neutral", precision: 0.61, recall: 0.71, f1: 0.66, support: 620 },
  ],

  confusionMatrix: {
    labels: ["Anger", "Disgust", "Fear", "Happiness", "Sadness", "Surprise", "Neutral"],
    matrix: [
      [349, 14, 98, 29, 101, 32, 55], // Anger (actual)
      [6, 32, 5, 0, 1, 0, 1], // Disgust (actual)
      [30, 3, 269, 14, 78, 38, 25], // Fear (actual)
      [14, 1, 12, 784, 15, 22, 40], // Happiness (actual)
      [44, 3, 53, 15, 280, 2, 54], // Sadness (actual)
      [7, 0, 22, 18, 3, 298, 3], // Surprise (actual)
      [45, 2, 53, 39, 130, 8, 442], // Neutral (actual)
    ],
  },

  emotionDifficulty: [
    {
      emotion: "sadness",
      difficulty: 0.85,
      reasons: [
        "Lowest recall (46%) - many sad expressions missed",
        "Often confused with neutral expressions (130 misclassifications)",
        "Subtle facial expressions can be hard to distinguish",
        "Limited training data compared to other emotions",
      ],
    },
    {
      emotion: "fear",
      difficulty: 0.78,
      reasons: [
        "Frequently confused with anger (98 misclassifications)",
        "Similar facial muscle activation patterns",
        "Often mixed with surprise expressions (38 misclassifications)",
        "Moderate precision (59%) indicates false positives",
      ],
    },
    {
      emotion: "anger",
      difficulty: 0.72,
      reasons: [
        "Low precision (51%) - many false positives",
        "Confused with sadness (101 misclassifications)",
        "Overlapping features with disgust and fear",
        "Intensity variations make detection challenging",
      ],
    },
    {
      emotion: "disgust",
      difficulty: 0.65,
      reasons: [
        "Very limited training data (only 55 samples)",
        "Good precision (71%) but lower recall (58%)",
        "Subtle nose and mouth expressions",
        "Often requires more pronounced facial features",
      ],
    },
    {
      emotion: "neutral",
      difficulty: 0.45,
      reasons: [
        "Moderate precision (61%) with good recall (71%)",
        "Baseline expression varies across individuals",
        "Sometimes confused with mild sadness",
        "Large support set (620 samples) helps performance",
      ],
    },
    {
      emotion: "surprise",
      difficulty: 0.35,
      reasons: [
        "High precision (85%) with good recall (74%)",
        "Distinctive wide-eye and open-mouth features",
        "Clear facial expression patterns",
        "Good separation from other emotions",
      ],
    },
    {
      emotion: "happiness",
      difficulty: 0.25,
      reasons: [
        "Best performing emotion (88% F1-score)",
        "Distinctive smile features are easily recognizable",
        "Largest training dataset (899 samples)",
        "High precision (88%) and recall (87%)",
      ],
    },
  ],

  modelComparison: [
    { metric: "Overall Accuracy", current: 0.68, previous: 0.65 },
    { metric: "Macro F1 Score", current: 0.66, previous: 0.62 },
    { metric: "Weighted F1 Score", current: 0.68, previous: 0.64 },
    { metric: "Best Class Performance", current: 0.88, previous: 0.82 },
  ],
}
