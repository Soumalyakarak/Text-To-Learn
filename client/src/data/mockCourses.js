export const mockCourses = [
    {
      id: "intro-to-ml",
      title: "Introduction to Machine Learning",
      description:
        "A foundational course covering supervised and unsupervised learning, model evaluation, and practical ML workflows — built for beginners with basic Python knowledge.",
      tags: ["Machine Learning"],
      progress: 62,
      modules: [
        {
          title: "Basics of ML",
          lessons: [
            { id: "what-is-supervised-learning", title: "What is Supervised Learning?", done: true },
            { id: "what-is-unsupervised-learning", title: "What is Unsupervised Learning?", done: true },
            { id: "training-vs-test-data", title: "Training vs. Test Data", done: false },
            { id: "overfitting-underfitting", title: "Overfitting and Underfitting", done: false },
          ],
        },
        {
          title: "Core Algorithms",
          lessons: [
            { id: "linear-regression", title: "Linear Regression", done: false },
            { id: "decision-trees", title: "Decision Trees", done: false },
          ],
        },
        {
          title: "Model Evaluation",
          lessons: [{ id: "accuracy-precision-recall", title: "Accuracy, Precision, Recall", done: false }],
        },
      ],
    },
    {
      id: "copyright-law-101",
      title: "Basics of Copyright Law",
      description: "What creators need to know about ownership, licensing, and fair use.",
      tags: ["Law"],
      progress: 0,
      modules: [
        {
          title: "Foundations",
          lessons: [{ id: "what-is-copyright", title: "What is Copyright?", done: false }],
        },
      ],
    },
  ];
  
  // Full lesson content JSON, matching the generateLessonPrompt() output format
  export const lessonContent = {
    "what-is-supervised-learning": {
      title: "What is Supervised Learning?",
      objectives: [
        "Understand the core definition of supervised learning",
        "Identify the difference between labeled and unlabeled data",
        "Recognize common supervised learning use cases",
      ],
      content: [
        {
          type: "paragraph",
          text: "Artificial intelligence has many branches, and supervised learning is one of the most widely used. In supervised learning, a model learns from labeled examples — pairs of input data and the correct output — so it can predict outputs for new, unseen inputs.",
        },
        { type: "heading", text: "A Simple Example" },
        {
          type: "paragraph",
          text: "Imagine you're training a model to recognize whether an email is spam. You feed it thousands of emails, each labeled \"spam\" or \"not spam.\" Over time, the model learns patterns that separate the two categories.",
        },
        {
          type: "code",
          language: "python",
          text: "from sklearn.linear_model import LogisticRegression\n\nmodel = LogisticRegression()\nmodel.fit(X_train, y_train)\npredictions = model.predict(X_test)",
        },
        { type: "video", query: "Supervised Learning Explained" },
        {
          type: "mcq",
          question: "What is the defining feature of supervised learning?",
          options: [
            "The model receives no data at all",
            "The model learns from labeled input-output pairs",
            "The model only works with images",
          ],
          answer: 1,
          explanation:
            "Correct — supervised learning relies on labeled data, where each input has a known, correct output the model learns to predict.",
        },
      ],
    },
  };
  