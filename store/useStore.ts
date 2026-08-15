import { create } from "zustand";

export type WorkspaceStatus =
  | "WRITING"
  | "EVALUATING"
  | "MCQ"
  | "TUTORING"
  | "SUBMITTED";

export type TutorPhase = "REFLECTION_LOCK" | "CHAT_ACTIVE";
export type Role = "student" | "teacher";
export type SubscriptionTier = "free" | "pro";

export interface CourseAssignment {
  id: string;
  title: string;
  status: "start" | "resume" | "graded";
}

export interface StudentCourse {
  id: string;
  title: string;
  subtitle: string;
  inviteCode: string;
  assignments: CourseAssignment[];
}

export interface TeacherStudent {
  id: string;
  name: string;
  status: "unopened" | "writing" | "graded";
}

export interface TeacherCourse {
  id: string;
  title: string;
  description: string;
  enrollmentCount: number;
  students: TeacherStudent[];
}

export interface SolveTraceEvent {
  tick: number;
  text_state: string;
  event: string;
}

export interface LearningGraphPoint {
  checkpoint: string;
  understanding_score: number;
  event: string;
}

export interface MCQChoice {
  key: string;
  text: string;
}

export interface ToastMessage {
  id: string;
  message: string;
  type: "success" | "warning" | "info";
}

export const MOCK_ASSIGNMENT = {
  assignment_id: "assign-circ-001",
  course_id: "course-phys-101",
  topic: "Classical Mechanics: Circular Motion",
  prompt:
    "Explain why a passenger feels thrown outward when a car rounds a sharp corner. Discuss the frame of reference, centripetal acceleration, and centrifugal force.",
  mcq_checkpoint: {
    question:
      "When a car turns left, what physical force pulls the passenger outward relative to the road's frame of reference?",
    choices: [
      {
        key: "A",
        text: "Centrifugal force (a real, external pulling force)",
      },
      {
        key: "B",
        text: "No force pulls them outward; inertia keeps their body moving in a straight line",
      },
      {
        key: "C",
        text: "Centripetal force pushing outwards from the axis of rotation",
      },
      { key: "D", text: "Gravitational friction shear force" },
    ] as MCQChoice[],
    correct_key: "B",
  },
  tutor_context: {
    confusion_point: "Centrifugal force is a real outward force.",
    socratic_analogy:
      "Imagine you are sliding a coffee cup on the dashboard of a car. When the car executes a sharp turn, does an invisible hand push the cup? Or does the dashboard slide away under it?",
    youtube_url: "https://www.youtube.com/embed/5T5M-W85-bM",
  },
};

export const MOCK_SOLVE_TRACE: SolveTraceEvent[] = [
  { tick: 0, text_state: "", event: "Session Started" },
  {
    tick: 1,
    text_state: "When a car makes a sudden left turn,",
    event: "Typing",
  },
  {
    tick: 2,
    text_state:
      "When a car makes a sudden left turn, the passengers inside feel like they are pushed to the right.",
    event: "Typing",
  },
  {
    tick: 3,
    text_state:
      "When a car makes a sudden left turn, the passengers inside feel like they are pushed to the right. This outward feeling is due to centrifugal force.",
    event: "Checkpoint Triggered",
  },
  {
    tick: 4,
    text_state:
      "When a car makes a sudden left turn, the passengers inside feel like they are pushed to the right. This outward feeling is due to centrifugal force.",
    event: "MCQ Incorrect: Selected Choice A",
  },
  {
    tick: 5,
    text_state:
      "When a car makes a sudden left turn, the passengers inside feel like they are pushed to the right. This outward feeling is due to centrifugal force.",
    event: "Socratic Tutor Chat Opened & YouTube Video Suggested",
  },
  {
    tick: 6,
    text_state:
      "When a car makes a sudden left turn, the passengers inside feel like they are pushed to the right. Inertia keeps their body moving in a straight line.",
    event: "Socratic Tutor Complete (Editor Unlocked)",
  },
  {
    tick: 7,
    text_state:
      "When a car makes a sudden left turn, the passengers inside feel like they are pushed to the right. Inertia keeps their body moving in a straight line. According to Newton's first law, a body in motion stays in motion in a straight line unless acted on by an external net force.",
    event: "Submission Finalized",
  },
];

export const MOCK_LEARNING_GRAPH: LearningGraphPoint[] = [
  {
    checkpoint: "Start",
    understanding_score: 100,
    event: "Session initialized",
  },
  {
    checkpoint: "Checkpoint 1",
    understanding_score: 90,
    event: "Typing draft",
  },
  {
    checkpoint: "Checkpoint 2",
    understanding_score: 35,
    event: "MCQ Incorrect (Confusion Alert)",
  },
  {
    checkpoint: "Checkpoint 3",
    understanding_score: 55,
    event: "Tutor Chat Socratic Analogy Read",
  },
  {
    checkpoint: "Checkpoint 4",
    understanding_score: 85,
    event: "Remedial Video Watched & Concept Clarified",
  },
  {
    checkpoint: "Submission",
    understanding_score: 92,
    event: "Final Essay Submitted",
  },
];

export const MOCK_RUBRIC = {
  aiScore: 87,
  criteria: [
    {
      name: "Conceptual Understanding",
      score: 88,
      feedback:
        "Strong grasp of inertia after remediation; initial centrifugal misconception corrected.",
    },
    {
      name: "Logical Reasoning",
      score: 85,
      feedback:
        "Clear causal chain from frame of reference to perceived outward motion.",
    },
    {
      name: "Explanation Quality",
      score: 90,
      feedback:
        "Well-structured paragraphs with appropriate physics vocabulary.",
    },
    {
      name: "Academic Independence",
      score: 84,
      feedback:
        "Required Socratic guidance once; final revision shows independent reasoning.",
    },
  ],
};

const INITIAL_STUDENT_COURSES: StudentCourse[] = [
  {
    id: "course-phys-101",
    title: "Physics 101: Mechanics",
    subtitle: "Classical mechanics & motion",
    inviteCode: "PHY101AB",
    assignments: [
      {
        id: "assign-circ-001",
        title: "Circular Motion & Inertia",
        status: "start",
      },
      {
        id: "assign-friction-002",
        title: "Friction & Normal Force",
        status: "resume",
      },
    ],
  },
  {
    id: "course-hist-202",
    title: "World History: The Cold War",
    subtitle: "1947–1991 geopolitical tensions",
    inviteCode: "HIS202",
    assignments: [
      {
        id: "assign-cold-war-001",
        title: "Cuban Missile Crisis Essay",
        status: "graded",
      },
    ],
  },
];

const INITIAL_TEACHER_COURSES: TeacherCourse[] = [
  {
    id: "course-phys-101",
    title: "Physics 101: Mechanics",
    description: "Introductory classical mechanics for first-year students.",
    enrollmentCount: 24,
    students: [
      { id: "stu-alex", name: "Alex Rivera", status: "writing" },
      { id: "stu-jamie", name: "Jamie Smith", status: "graded" },
      { id: "stu-sam", name: "Sam Chen", status: "unopened" },
    ],
  },
  {
    id: "course-hist-202",
    title: "World History: The Cold War",
    description: "Analysis of Cold War diplomacy and proxy conflicts.",
    enrollmentCount: 18,
    students: [
      { id: "stu-maya", name: "Maya Patel", status: "graded" },
      { id: "stu-jordan", name: "Jordan Lee", status: "unopened" },
    ],
  },
];

interface ChatMessage {
  id: string;
  role: "tutor" | "student";
  content: string;
  streaming?: boolean;
}

interface NousStore {
  role: Role;
  setRole: (role: Role) => void;

  workspaceStatus: WorkspaceStatus;
  essayText: string;
  mcqTriggered: boolean;
  checkpointScore: number;
  tutorPhase: TutorPhase;
  tutorMessages: ChatMessage[];
  tutorStreamComplete: boolean;
  canUnlockCanvas: boolean;
  selectedMcqKey: string | null;
  mcqAnswered: boolean;

  studentCourses: StudentCourse[];
  selectedCourseId: string | null;
  inviteCodeInput: string;

  teacherCourses: TeacherCourse[];
  subscriptionTier: SubscriptionTier;
  selectedTeacherCourseId: string | null;
  selectedStudentId: string | null;
  newCourseTitle: string;
  newCourseDescription: string;
  showUpgradeModal: boolean;
  showLimitModal: boolean;
  checkoutLoading: boolean;

  gradeOverride: number;
  instructorNotes: string;
  overrideSaved: boolean;

  toasts: ToastMessage[];

  setWorkspaceStatus: (status: WorkspaceStatus) => void;
  setEssayText: (text: string) => void;
  triggerMcqCheckpoint: () => void;
  answerMcq: (key: string) => void;
  mcqTimeout: () => void;
  startTutoring: () => void;
  completeTutorStream: () => void;
  addTutorMessage: (msg: ChatMessage) => void;
  sendStudentChat: (text: string) => void;
  unlockCanvas: () => void;
  submitEssay: () => void;
  resetWorkspace: () => void;

  setInviteCodeInput: (code: string) => void;
  joinCourse: (code: string) => boolean;
  setSelectedCourseId: (id: string | null) => void;

  setNewCourseTitle: (title: string) => void;
  setNewCourseDescription: (desc: string) => void;
  createCourse: () => boolean;
  upgradeToPro: () => void;
  setShowUpgradeModal: (show: boolean) => void;
  setShowLimitModal: (show: boolean) => void;
  setSelectedTeacherCourseId: (id: string | null) => void;
  setSelectedStudentId: (id: string | null) => void;

  setGradeOverride: (grade: number) => void;
  setInstructorNotes: (notes: string) => void;
  saveOverride: () => void;

  addToast: (message: string, type?: ToastMessage["type"]) => void;
  removeToast: (id: string) => void;
}

let toastCounter = 0;

export const useStore = create<NousStore>((set, get) => ({
  role: "student",
  setRole: (role) => set({ role }),

  workspaceStatus: "WRITING",
  essayText: "",
  mcqTriggered: false,
  checkpointScore: 0,
  tutorPhase: "REFLECTION_LOCK",
  tutorMessages: [],
  tutorStreamComplete: false,
  canUnlockCanvas: false,
  selectedMcqKey: null,
  mcqAnswered: false,

  studentCourses: INITIAL_STUDENT_COURSES,
  selectedCourseId: null,
  inviteCodeInput: "",

  teacherCourses: INITIAL_TEACHER_COURSES,
  subscriptionTier: "free",
  selectedTeacherCourseId: null,
  selectedStudentId: null,
  newCourseTitle: "",
  newCourseDescription: "",
  showUpgradeModal: false,
  showLimitModal: false,
  checkoutLoading: false,

  gradeOverride: 87,
  instructorNotes: "",
  overrideSaved: false,

  toasts: [],

  setWorkspaceStatus: (status) => set({ workspaceStatus: status }),

  setEssayText: (text) => set({ essayText: text }),

  triggerMcqCheckpoint: () => {
    if (get().mcqTriggered) return;
    set({ mcqTriggered: true, workspaceStatus: "EVALUATING" });
    setTimeout(() => {
      set({ workspaceStatus: "MCQ" });
    }, 1500);
  },

  answerMcq: (key) => {
    const correct = MOCK_ASSIGNMENT.mcq_checkpoint.correct_key;
    set({ selectedMcqKey: key, mcqAnswered: true });

    if (key === correct) {
      set((s) => ({
        checkpointScore: s.checkpointScore + 1,
        workspaceStatus: "WRITING",
      }));
      get().addToast("Checkpoint passed! Continue writing.", "success");
    } else {
      set({ workspaceStatus: "TUTORING" });
      get().startTutoring();
    }
  },

  mcqTimeout: () => {
    set({ workspaceStatus: "WRITING", mcqAnswered: true });
    get().addToast("Time expired — editor unlocked.", "info");
  },

  startTutoring: () => {
    set({
      tutorPhase: "REFLECTION_LOCK",
      tutorMessages: [],
      tutorStreamComplete: false,
      canUnlockCanvas: false,
    });
  },

  completeTutorStream: () => {
    set({ tutorStreamComplete: true, tutorPhase: "CHAT_ACTIVE" });
  },

  addTutorMessage: (msg) =>
    set((s) => ({ tutorMessages: [...s.tutorMessages, msg] })),

  sendStudentChat: (text) => {
    const studentMsg: ChatMessage = {
      id: `student-${Date.now()}`,
      role: "student",
      content: text,
    };
    set((s) => ({ tutorMessages: [...s.tutorMessages, studentMsg] }));

    const lower = text.toLowerCase();
    const hasConstructive =
      lower.includes("inertia") ||
      lower.includes("straight line") ||
      lower.includes("no outward force") ||
      lower.includes("frame of reference") ||
      text.length > 40;

    const tutorReply: ChatMessage = {
      id: `tutor-${Date.now()}`,
      role: "tutor",
      content: hasConstructive
        ? "Exactly — you're connecting inertia to the passenger's straight-line motion. How would you revise your essay to explain this without invoking a real outward force?"
        : "Consider the coffee cup analogy again. What object is actually changing direction — the cup, or the surface beneath it?",
    };

    setTimeout(() => {
      set((s) => ({
        tutorMessages: [...s.tutorMessages, tutorReply],
        canUnlockCanvas: hasConstructive,
      }));
    }, 800);
  },

  unlockCanvas: () => {
    set({ workspaceStatus: "WRITING", tutorPhase: "REFLECTION_LOCK" });
    get().addToast("Canvas unlocked — keep refining your explanation.", "success");
  },

  submitEssay: () => {
    set({ workspaceStatus: "SUBMITTED" });
    get().addToast("Essay submitted successfully!", "success");
  },

  resetWorkspace: () =>
    set({
      workspaceStatus: "WRITING",
      essayText: "",
      mcqTriggered: false,
      checkpointScore: 0,
      tutorPhase: "REFLECTION_LOCK",
      tutorMessages: [],
      tutorStreamComplete: false,
      canUnlockCanvas: false,
      selectedMcqKey: null,
      mcqAnswered: false,
    }),

  setInviteCodeInput: (code) => set({ inviteCodeInput: code }),

  joinCourse: (code) => {
    const normalized = code.trim().toUpperCase();
    const existing = get().studentCourses.find(
      (c) => c.inviteCode.toUpperCase() === normalized
    );
    if (existing) {
      get().addToast("You're already enrolled in this course.", "info");
      return false;
    }

    const catalog: Record<string, Omit<StudentCourse, "id">> = {
      HIS202: {
        title: "World History: The Cold War",
        subtitle: "1947–1991 geopolitical tensions",
        inviteCode: "HIS202",
        assignments: [
          {
            id: "assign-cold-war-new",
            title: "Berlin Wall Analysis",
            status: "start",
          },
        ],
      },
      PHY101AB: {
        title: "Physics 101: Mechanics",
        subtitle: "Classical mechanics & motion",
        inviteCode: "PHY101AB",
        assignments: [
          {
            id: "assign-new-phys",
            title: "Newton's Laws Application",
            status: "start",
          },
        ],
      },
    };

    const courseData = catalog[normalized];
    if (!courseData) {
      get().addToast("Invalid invite code. Try HIS202 or PHY101AB.", "warning");
      return false;
    }

    const newCourse: StudentCourse = {
      id: `course-${Date.now()}`,
      ...courseData,
    };

    set((s) => ({
      studentCourses: [...s.studentCourses, newCourse],
      inviteCodeInput: "",
    }));
    get().addToast(`Joined ${newCourse.title}!`, "success");
    return true;
  },

  setSelectedCourseId: (id) => set({ selectedCourseId: id }),

  setNewCourseTitle: (title) => set({ newCourseTitle: title }),
  setNewCourseDescription: (desc) => set({ newCourseDescription: desc }),

  createCourse: () => {
    const { teacherCourses, subscriptionTier, newCourseTitle, newCourseDescription } =
      get();
    if (!newCourseTitle.trim()) {
      get().addToast("Please enter a course title.", "warning");
      return false;
    }

    if (subscriptionTier === "free" && teacherCourses.length >= 2) {
      set({ showLimitModal: true });
      return false;
    }

    const newCourse: TeacherCourse = {
      id: `course-${Date.now()}`,
      title: newCourseTitle.trim(),
      description: newCourseDescription.trim() || "No description provided.",
      enrollmentCount: 0,
      students: [],
    };

    set((s) => ({
      teacherCourses: [...s.teacherCourses, newCourse],
      newCourseTitle: "",
      newCourseDescription: "",
    }));
    get().addToast(`Course "${newCourse.title}" created!`, "success");
    return true;
  },

  upgradeToPro: () => {
    set({ checkoutLoading: true, showUpgradeModal: true });
    setTimeout(() => {
      set({
        subscriptionTier: "pro",
        checkoutLoading: false,
        showUpgradeModal: false,
      });
      get().addToast("Welcome to Pro Tier — unlimited courses unlocked!", "success");
    }, 2000);
  },

  setShowUpgradeModal: (show) => set({ showUpgradeModal: show }),
  setShowLimitModal: (show) => set({ showLimitModal: show }),
  setSelectedTeacherCourseId: (id) => set({ selectedTeacherCourseId: id }),
  setSelectedStudentId: (id) => set({ selectedStudentId: id }),

  setGradeOverride: (grade) => set({ gradeOverride: grade }),
  setInstructorNotes: (notes) => set({ instructorNotes: notes }),

  saveOverride: () => {
    const { gradeOverride, instructorNotes, selectedStudentId, teacherCourses, selectedTeacherCourseId } =
      get();
    if (selectedTeacherCourseId && selectedStudentId) {
      set((s) => ({
        teacherCourses: s.teacherCourses.map((c) =>
          c.id === selectedTeacherCourseId
            ? {
                ...c,
                students: c.students.map((stu) =>
                  stu.id === selectedStudentId
                    ? { ...stu, status: "graded" as const }
                    : stu
                ),
              }
            : c
        ),
        overrideSaved: true,
      }));
    }
    get().addToast(
      `Override saved: ${gradeOverride}/100${instructorNotes ? " with notes" : ""}`,
      "success"
    );
    setTimeout(() => set({ overrideSaved: false }), 3000);
  },

  addToast: (message, type = "info") => {
    const id = `toast-${++toastCounter}`;
    set((s) => ({ toasts: [...s.toasts, { id, message, type }] }));
    setTimeout(() => get().removeToast(id), 4000);
  },

  removeToast: (id) =>
    set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),
}));
