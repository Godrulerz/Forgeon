def calculate_t_test_performance(total_time):
    """
    Calculates performance metrics for the T-Test.
    The primary outcome is just the total time.
    
    Parameters:
        total_time (float): Time to complete the T-Test (seconds)
    
    Returns:
        dict: Test results
    """
    if total_time <= 0:
        raise ValueError("Time must be greater than zero.")
    
    # Classification benchmarks (example, may vary by sport)
    if total_time < 9.5:
        rating = "Excellent"
    elif total_time < 10.5:
        rating = "Good"
    elif total_time < 11.5:
        rating = "Average"
    else:
        rating = "Below Average"
    
    return {
        "Total Time (s)": round(total_time, 2),
        "Performance Rating": rating
    }


def main():
    print("=== T-Test Agility Assessment ===")
    t = float(input("Enter total completion time (s): "))
    
    results = calculate_t_test_performance(t)
    
    print("\n--- Results ---")
    for k, v in results.items():
        print(f"{k}: {v}")


if __name__ == "__main__":
    main()
