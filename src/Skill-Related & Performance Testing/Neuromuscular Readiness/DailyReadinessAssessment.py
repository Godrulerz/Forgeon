import csv
from datetime import datetime

def daily_readiness():
    print("=== Daily Readiness Assessment ===")
    print("Rate each item from 1 (worst) to 5 (best)\n")

    # Questions
    questions = {
        "Sleep Quality": "How was your sleep quality? (1=very poor, 5=excellent): ",
        "Fatigue": "How fatigued do you feel? (1=very tired, 5=fully energized): ",
        "Muscle Soreness": "How sore are your muscles? (1=very sore, 5=no soreness): ",
        "Stress Levels": "How stressed are you? (1=very high, 5=very low): ",
        "Mood": "How is your mood? (1=very bad, 5=excellent): "
    }

    scores = {}
    total = 0

    # Collect responses
    for key, question in questions.items():
        while True:
            try:
                score = int(input(question))
                if 1 <= score <= 5:
                    scores[key] = score
                    total += score
                    break
                else:
                    print("⚠️ Please enter a number between 1 and 5.")
            except ValueError:
                print("⚠️ Invalid input. Please enter a number between 1 and 5.")

    # Calculations
    max_score = len(questions) * 5
    readiness_percent = (total / max_score) * 100

    if readiness_percent >= 80:
        status = "High Readiness ✅"
    elif readiness_percent >= 60:
        status = "Moderate Readiness ⚠️"
    else:
        status = "Low Readiness ❌"

    # Display results
    print("\n=== Results ===")
    for k, v in scores.items():
        print(f"{k}: {v}/5")
    print(f"\nTotal Score: {total}/{max_score}")
    print(f"Readiness: {readiness_percent:.1f}% → {status}")

    # Optional: Save to CSV
    save = input("\nSave results to CSV? (y/n): ").lower()
    if save == "y":
        filename = "daily_readiness_log.csv"
        header = ["Date"] + list(scores.keys()) + ["Total Score", "Readiness %", "Status"]
        row = [datetime.now().strftime("%Y-%m-%d %H:%M:%S")] + list(scores.values()) + [total, round(readiness_percent, 1), status]

        try:
            with open(filename, mode="a", newline="") as file:
                writer = csv.writer(file)
                if file.tell() == 0:  # Write header if file is empty
                    writer.writerow(header)
                writer.writerow(row)
            print(f"✅ Results saved to {filename}")
        except Exception as e:
            print(f"⚠️ Could not save results: {e}")


if __name__ == "__main__":
    daily_readiness()
