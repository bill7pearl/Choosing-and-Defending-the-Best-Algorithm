/**
 * TASK SCHEDULER: BRUTE-FORCE VS GREEDY
 */

// 1. BRUTE-FORCE (Recursive)
// Warning: Will crash or hang on inputs > 25-30 tasks.
const solveBruteForce = (tasks) => {
  let maxTasks = [];

  const findCombinations = (index, currentSet) => {
    if (index === tasks.length) {
      if (currentSet.length > maxTasks.length) {
        maxTasks = [...currentSet];
      }
      return;
    }

    // Option 1: Include task (if no overlap)
    const currentTask = tasks[index];
    const hasOverlap = currentSet.some(t => 
      (currentTask.start < t.end && currentTask.end > t.start)
    );

    if (!hasOverlap) {
      findCombinations(index + 1, [...currentSet, currentTask]);
    }

    // Option 2: Skip task
    findCombinations(index + 1, currentSet);
  };

  findCombinations(0, []);
  return maxTasks;
};

// 2. GREEDY (Earliest Finish Time First)
// Optimal for Real-time Systems
const solveGreedy = (tasks) => {
  if (tasks.length === 0) return [];

  // Sort by end time: O(n log n)
  const sortedTasks = [...tasks].sort((a, b) => a.end - b.end);
  
  const selectedTasks = [];
  let lastEndTime = -1;

  for (const task of sortedTasks) {
    // If the task starts after or when the last one ended
    if (task.start >= lastEndTime) {
      selectedTasks.push(task);
      lastEndTime = task.end;
    }
  }

  return selectedTasks;
};

// --- VALIDATION ---
const sampleTasks = [
  { start: 1, end: 3 }, { start: 2, end: 5 }, { start: 4, end: 6 },
  { start: 6, end: 7 }, { start: 5, end: 9 }, { start: 8, end: 10 }
];

console.log("Brute Force Result Count:", solveBruteForce(sampleTasks).length); // 4
console.log("Greedy Result Count:", solveGreedy(sampleTasks).length);          // 4
