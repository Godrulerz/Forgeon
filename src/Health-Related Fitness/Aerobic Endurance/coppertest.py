def cooper_test():
    print("=== Cooper 12-Minute Run Test ===")

    distance = float(input("Enter total distance covered (m): "))
    laps_completed = int(input("Enter total laps completed: "))

    vo2_max = (distance - 504.9) / 44.73

    print("\n--- Cooper Test Results ---")
    print(f"Distance Covered : {distance} m")
    print(f"Laps Completed   : {laps_completed}")
    print(f"Estimated VO₂ Max: {vo2_max:.2f} ml/kg/min")


if __name__ == "__main__":
    cooper_test()
