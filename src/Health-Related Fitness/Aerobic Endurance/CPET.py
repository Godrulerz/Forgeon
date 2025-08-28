def cpet_test():
    print("=== Cardiopulmonary Exercise Test (CPET) ===")

    vo2_max = float(input("VO₂ Max (ml/kg/min): "))
    max_hr = int(input("Max Heart Rate (bpm): "))
    max_power = float(input("Max Power (W): "))
    max_rer = float(input("Max RER (ratio): "))
    duration = input("Test Duration (HH:MM:SS): ")

    print("\n--- CPET Results ---")
    print(f"VO₂ Max       : {vo2_max:.1f} ml/kg/min")
    print(f"Max HR        : {max_hr} bpm")
    print(f"Max Power     : {max_power:.1f} W")
    print(f"Max RER       : {max_rer:.2f}")
    print(f"Test Duration : {duration}")


if __name__ == "__main__":
    cpet_test()
