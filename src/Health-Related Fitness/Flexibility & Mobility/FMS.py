def fms_test():
    print("=== Functional Movement Screen (FMS) ===")
    print("Please enter scores for each test (0-3)")

    # Collect input scores
    deep_squat = int(input("Deep Squat (0-3): "))

    hurdle_step_L = int(input("Hurdle Step (L) (0-3): "))
    hurdle_step_R = int(input("Hurdle Step (R) (0-3): "))

    in_line_lunge_L = int(input("In-Line Lunge (L) (0-3): "))
    in_line_lunge_R = int(input("In-Line Lunge (R) (0-3): "))

    shoulder_mobility_L = int(input("Shoulder Mobility (L) (0-3): "))
    shoulder_mobility_R = int(input("Shoulder Mobility (R) (0-3): "))

    leg_raise_L = int(input("Active Straight Leg Raise (L) (0-3): "))
    leg_raise_R = int(input("Active Straight Leg Raise (R) (0-3): "))

    trunk_stability = int(input("Trunk Stability (0-3): "))

    rotary_stability_L = int(input("Rotary Stability (L) (0-3): "))
    rotary_stability_R = int(input("Rotary Stability (R) (0-3): "))

    # Apply FMS rules: for left-right tests, take the lower score
    hurdle_step = min(hurdle_step_L, hurdle_step_R)
    in_line_lunge = min(in_line_lunge_L, in_line_lunge_R)
    shoulder_mobility = min(shoulder_mobility_L, shoulder_mobility_R)
    leg_raise = min(leg_raise_L, leg_raise_R)
    rotary_stability = min(rotary_stability_L, rotary_stability_R)

    # Total FMS score (max = 21)
    total_score = (
        deep_squat +
        hurdle_step +
        in_line_lunge +
        shoulder_mobility +
        leg_raise +
        trunk_stability +
        rotary_stability
    )

    print("\n--- FMS Results ---")
    print(f"Deep Squat               : {deep_squat}")
    print(f"Hurdle Step (min)        : {hurdle_step}")
    print(f"In-Line Lunge (min)      : {in_line_lunge}")
    print(f"Shoulder Mobility (min)  : {shoulder_mobility}")
    print(f"Leg Raise (min)          : {leg_raise}")
    print(f"Trunk Stability          : {trunk_stability}")
    print(f"Rotary Stability (min)   : {rotary_stability}")
    print(f"\n✅ Total FMS Score       : {total_score}/21")

    # Quick interpretation
    if total_score < 14:
        print("⚠️ High risk of injury (score < 14)")
    elif total_score <= 17:
        print("✅ Average movement quality")
    else:
        print("💪 Excellent movement quality")


if __name__ == "__main__":
    fms_test()
