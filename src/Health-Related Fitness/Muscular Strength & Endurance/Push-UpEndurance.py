def pushup_endurance_test():
    print("=== Push-Up Endurance Test ===")
    print("Enter athlete data (type 'done' to finish)\n")

    records = []

    while True:
        athlete = input("Athlete Name (or 'done' to stop): ")
        if athlete.lower() == "done":
            break

        total_reps = int(input("Total Repetitions: "))
        duration = input("Test Duration (mm:ss): ")
        form_breakdown = input("Form Breakdown Point [optional]: ")

        record = {
            "Athlete": athlete,
            "Total Repetitions": total_reps,
            "Test Duration": duration,
            "Form Breakdown Point": form_breakdown if form_breakdown else "-",
        }
        records.append(record)
        print("\n✅ Entry recorded!\n")

    print("\n--- Push-Up Endurance Test Results ---")
    for r in records:
        print(
            f"Athlete: {r['Athlete']} | Reps={r['Total Repetitions']} | "
            f"Duration={r['Test Duration']} | Form Breakdown={r['Form Breakdown Point']}"
        )


if __name__ == "__main__":
    pushup_endurance_test()
