def calculate_jump_height(flight_time_ms):
    """
    Calculate jump height from flight time.
    
    Parameters:
        flight_time_ms (float): Flight time in milliseconds
    
    Returns:
        float: Jump height in centimeters
    """
    if flight_time_ms <= 0:
        raise ValueError("Flight time must be positive.")
    
    g = 9.81  # gravity (m/s^2)
    t = flight_time_ms / 1000  # convert ms to s
    
    # Formula: h = (g * t^2) / 8
    jump_height_m = (g * t**2) / 8
    return round(jump_height_m * 100, 2)  # in cm


def main():
    print("=== Flight Time Jump Test ===")
    flight_time_ms = float(input("Enter Flight Time (ms): "))
    
    jump_height_cm = calculate_jump_height(flight_time_ms)
    
    print("\n--- Results ---")
    print(f"Flight Time: {flight_time_ms:.2f} ms")
    print(f"Calculated Jump Height: {jump_height_cm:.2f} cm")


if __name__ == "__main__":
    main()
