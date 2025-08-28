def sit_and_reach_test():
    print("=== Sit-and-Reach Flexibility Test ===")

    reach_distance = float(input("Enter Reach Distance (cm): "))
    trial1 = float(input("Enter Trial 1 (cm): "))
    trial2 = float(input("Enter Trial 2 (cm): "))
    trial3 = float(input("Enter Trial 3 (cm): "))

    # Auto-calculations
    avg_trial = (trial1 + trial2 + trial3) / 3
    best_trial = max(trial1, trial2, trial3)

    print("\n--- Sit-and-Reach Test Results ---")
    print(f"Reach Distance Recorded : {reach_distance:.2f} cm")
    print(f"Trial 1                 : {trial1:.2f} cm")
    print(f"Trial 2                 : {trial2:.2f} cm")
    print(f"Trial 3                 : {trial3:.2f} cm")
    print(f"Average of Trials       : {avg_trial:.2f} cm")
    print(f"Best Trial Score        : {best_trial:.2f} cm")


if __name__ == "__main__":
    sit_and_reach_test()
