def plank_hold_test():
    print("=== Plank Hold Test ===")
    print("Enter athlete data (type 'done' to finish)\n")

    records = []

    while True:
        athlete = input("Athlete Name (or 'done' to stop): ")
        if athlete.lower() == "done":
            break

        hold_time = input("Hold Time (mm:ss): ")
        form_notes = input("Form Notes [optional]: ")

        record = {
            "Athlete": athlete,
            "Hold Time": hold_time,
            "Form Notes": form_notes if form_notes else "-",
        }
        records.append(record)
        print("\n✅ Entry recorded!\n")

    print("\n--- Plank Hold Test Results ---")
    for r in records:
        print(
            f"Athlete: {r['Athlete']} | Hold Time={r['Hold Time']} | Notes={r['Form Notes']}"
        )


if __name__ == "__main__":
    plank_hold_test()
