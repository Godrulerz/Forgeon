def one_rm_testing():
    print("=== 1RM Testing (One Repetition Maximum) ===")
    print("Enter athlete data (type 'done' to finish)\n")

    records = []

    while True:
        athlete = input("Athlete Name (or 'done' to stop): ")
        if athlete.lower() == "done":
            break

        body_mass = float(input("Body Mass (kg): "))
        lift_type = input("Lift Type (e.g., Squat, Bench Press, Deadlift): ")
        warmup_weight = float(input("Warm-up Weight (kg): "))
        one_rm = float(input("1RM (kg): "))
        rpe = input("RPE (Rate of Perceived Exertion 1–10): ")
        form_notes = input("Form Notes [optional]: ")

        # Auto-calculation: Relative Strength
        relative_strength = round(one_rm / body_mass, 2)

        record = {
            "Athlete": athlete,
            "Body Mass (kg)": body_mass,
            "Lift Type": lift_type,
            "Warm-up Weight (kg)": warmup_weight,
            "1RM (kg)": one_rm,
            "RPE": rpe,
            "Form Notes": form_notes if form_notes else "-",
            "Relative Strength (kg/kg)": relative_strength
        }
        records.append(record)
        print("\n✅ Entry recorded!\n")

    print("\n--- 1RM Test Results ---")
    for r in records:
        print(
            f"Athlete: {r['Athlete']} | Lift: {r['Lift Type']} | "
            f"1RM={r['1RM (kg)']}kg | Warmup={r['Warm-up Weight (kg)']}kg | "
            f"RPE={r['RPE']} | Rel.Str={r['Relative Strength (kg/kg)']} | "
            f"Notes={r['Form Notes']}"
        )


if __name__ == "__main__":
    one_rm_testing()
