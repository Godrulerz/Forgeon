def joint_specific_rom():
    print("=== Joint-Specific ROM Assessment ===")
    print("Enter data for each joint measured (type 'done' to finish)\n")

    records = []

    while True:
        joint = input("Joint (e.g., Shoulder, Knee) or 'done' to stop: ")
        if joint.lower() == "done":
            break

        side = input("Side (L/R): ")
        active_rom = float(input("Active ROM (°): "))
        passive_rom = float(input("Passive ROM (°): "))
        pain_present = input("Pain Present (Yes/No): ")
        coach_notes = input("Coach Notes (Optional): ")

        record = {
            "Joint": joint,
            "Side": side.upper(),
            "Active ROM (°)": active_rom,
            "Passive ROM (°)": passive_rom,
            "Pain Present": pain_present.capitalize(),
            "Coach Notes": coach_notes if coach_notes else "-"
        }
        records.append(record)
        print("\n✅ Entry recorded!\n")

    print("\n--- Joint-Specific ROM Results ---")
    for r in records:
        print(
            f"{r['Joint']} ({r['Side']}): "
            f"Active {r['Active ROM (°)']}°, "
            f"Passive {r['Passive ROM (°)']}°, "
            f"Pain: {r['Pain Present']}, "
            f"Notes: {r['Coach Notes']}"
        )


if __name__ == "__main__":
    joint_specific_rom()
