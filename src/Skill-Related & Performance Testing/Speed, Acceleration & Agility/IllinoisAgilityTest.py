def classify_performance(time_sec, gender="male"):
    """
    Classify Illinois Agility Test performance based on normative data.
    Times are general guidelines and may vary with age/level.
    
    Parameters:
        time_sec (float): Completion time in seconds
        gender (str): 'male' or 'female'
    
    Returns:
        str: Performance category
    """
    if gender.lower() == "male":
        if time_sec < 15.2:
            return "Excellent"
        elif time_sec < 16.1:
            return "Good"
        elif time_sec < 18.1:
            return "Average"
        elif time_sec < 19.3:
            return "Below Average"
        else:
            return "Poor"
    else:  # female
        if time_sec < 17.0:
            return "Excellent"
        elif time_sec < 17.9:
            return "Good"
        elif time_sec < 21.0:
            return "Average"
        elif time_sec < 23.0:
            return "Below Average"
        else:
            return "Poor"


def main():
    print("=== Illinois Agility Test ===")
    time_sec = float(input("Enter completion time (s): "))
    gender = input("Enter gender (male/female): ").strip().lower()
    
    category = classify_performance(time_sec, gender)
    
    print("\n--- Results ---")
    print(f"Completion Time: {time_sec:.2f} s")
    print(f"Performance Rating: {category}")


if __name__ == "__main__":
    main()
