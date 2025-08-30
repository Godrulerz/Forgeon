def calculate_505_test(time_left_turn, time_right_turn=None):
    """
    Calculate 505 agility test performance.
    
    Parameters:
        time_left_turn (float): Time in seconds for left-side 505 test
        time_right_turn (float, optional): Time in seconds for right-side 505 test
    
    Returns:
        dict: Test results
    """
    if time_left_turn <= 0:
        raise ValueError("Left turn time must be positive.")
    
    results = {
        "Left Turn Time (s)": round(time_left_turn, 2)
    }
    
    # If right turn is also provided
    if time_right_turn is not None:
        if time_right_turn <= 0:
            raise ValueError("Right turn time must be positive.")
        results["Right Turn Time (s)"] = round(time_right_turn, 2)
        
        # Symmetry Index (difference between sides as %)
        asymmetry = abs(time_left_turn - time_right_turn) / max(time_left_turn, time_right_turn) * 100
        results["Asymmetry (%)"] = round(asymmetry, 2)
        
        avg_time = (time_left_turn + time_right_turn) / 2
        results["Average 505 Time (s)"] = round(avg_time, 2)
    
    return results


def main():
    print("=== 505 Agility Test ===")
    left = float(input("Enter Left Turn Time (s): "))
    
    right_input = input("Enter Right Turn Time (s) [optional]: ").strip()
    right = float(right_input) if right_input else None
    
    results = calculate_505_test(left, right)
    
    print("\n--- Results ---")
    for k, v in results.items():
        print(f"{k}: {v}")


if __name__ == "__main__":
    main()
