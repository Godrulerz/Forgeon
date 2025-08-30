import time
import random
from datetime import datetime
from typing import List, Dict, Any


class DrillResult:
    def __init__(self, trial: int, value: int):
        self.id = f"result-{trial}"
        self.metric = "reaction_time"
        self.value = value
        self.unit = "ms"
        self.timestamp = datetime.now()
        self.trial = trial


class DrillSession:
    def __init__(self, drill_id: str, athlete_id: str):
        self.id = f"session-{int(time.time()*1000)}"
        self.drill_id = drill_id
        self.athlete_id = athlete_id
        self.start_time = datetime.now()
        self.end_time = None
        self.results: List[DrillResult] = []
        self.status = "in_progress"

    def complete(self):
        self.end_time = datetime.now()
        self.status = "completed"


class DrillExecution:
    def __init__(self, drill_id: str, name: str, estimated_duration: int = 300):
        self.drill_id = drill_id
        self.name = name
        self.config = {
            "duration": estimated_duration,
            "trials": 10,
            "rest_between_trials": 3,
            "difficulty": "medium",
            "audio_enabled": True,
            "visual_cues": True
        }
        self.phase = "setup"
        self.current_trial = 0
        self.results: List[DrillResult] = []
        self.session: DrillSession | None = None
        self.accuracy = 0

    def start(self, athlete_id="athlete-1"):
        print(f"Starting drill '{self.name}'")
        self.phase = "running"
        self.session = DrillSession(self.drill_id, athlete_id)
        self.current_trial = 0
        self.results.clear()
        self.accuracy = 0
        start_time = time.time()
        while time.time() - start_time < self.config["duration"] and self.current_trial < self.config["trials"]:
            self.run_trial()
            time.sleep(self.config["rest_between_trials"])
        self.phase = "completed"
        self.session.complete()
        print("✅ Drill completed.")

    def run_trial(self):
        self.current_trial += 1
        print(f"\n🔹 Trial {self.current_trial}/{self.config['trials']}: Wait for stimulus...")
        delay = random.uniform(2, 5)
        time.sleep(delay)
        print("⚡ Stimulus appeared! TAP NOW (press Enter)")
        trial_start = time.time()
        response = self.get_response(trial_start)
        if response is None:
            print("⏱️ Missed response (2000ms)")
            result = DrillResult(self.current_trial, 2000)
        else:
            rt = int((response - trial_start) * 1000)
            print(f"Reaction Time: {rt}ms")
            result = DrillResult(self.current_trial, rt)
            self.accuracy += 10 if rt < 500 else 5
        self.results.append(result)

    def get_response(self, trial_start: float):
        start_wait = time.time()
        while time.time() - start_wait < 2:
            if input().strip() == "":
                return time.time()
        return None

    def summary(self) -> Dict[str, Any]:
        avg_rt = (
            sum(r.value for r in self.results if r.value < 2000) / len(self.results)
            if self.results else 0
        )
        best_time = min((r.value for r in self.results), default=2000)
        success_rate = (
            sum(1 for r in self.results if r.value < 1000) / len(self.results) * 100
            if self.results else 0
        )
        return {
            "avg_reaction_time": avg_rt,
            "best_time": best_time,
            "success_rate": success_rate,
            "trials_completed": len(self.results),
            "score": self.accuracy
        }


if __name__ == "__main__":
    drill = DrillExecution(drill_id="d1", name="Reaction Training", estimated_duration=30)
    drill.start(athlete_id="player1")
    print("\n📊 Results Summary:", drill.summary())
