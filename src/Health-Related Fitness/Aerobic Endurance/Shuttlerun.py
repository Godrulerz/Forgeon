def shuttle_run_test():
    print("=== 20m Shuttle Run Test ===")

    final_level = int(input("Final Level: "))
    final_shuttles = int(input("Final Shuttles: "))
    total_shuttles = int(input("Total Shuttles: "))

    
    speed = 8 + 0.5 * (final_level - 1)

    vo2_max = 31.025 + (3.238 * speed) - (3.248 * 0)  
    print("\n--- 20m Shuttle Run Results ---")
    print(f"Final Level      : {final_level}")
    print(f"Final Shuttles   : {final_shuttles}")
    print(f"Total Shuttles   : {total_shuttles}")
    print(f"Speed Reached    : {speed:.1f} km/h")
    print(f"Estimated VO₂ Max: {vo2_max:.2f} ml/kg/min")


if __name__ == "__main__":
    shuttle_run_test()
