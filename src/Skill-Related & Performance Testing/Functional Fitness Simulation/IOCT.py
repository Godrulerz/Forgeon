# Indoor Obstacle Course Test (IOCT) Calculator

def calculate_ioct(time_sec: float, penalties: int, cutoff_male: float = 155.0, cutoff_female: float = 170.0, gender: str = "male") -> dict:
    """
    Calculate IOCT performance results.

    Args:
        time_sec (float): Raw completion time in seconds.
        penalties (int): Number of penalties (missed/failed obstacles).
        cutoff_male (float): Male cutoff time (default: 155 sec).
        cutoff_female (float): Female cutoff time (default: 170 sec).
        gender (str): 'male' or 'female'.

    Returns:
        dict: Results including adjusted time and pass/fail status.
    """

    # Each penalty adds 5 seconds (adjustable if rules differ)
    penalty_time = penalties * 5.0
    adjusted_time = time_sec + penalty_time

    # Determine cutoff
    cutoff = cutoff_male if gender.lower() == "male" else cutoff_female

    # Determine pass/fail
    status = "PASS" if adjusted_time <= cutoff else "FAIL"

    return {
        "Raw Time (s)": time_sec,
        "Penalties": penalties,
        "Penalty Time (s)": penalty_time,
        "Adjusted Time (s)": adjusted_time,
        "Cutoff (s)": cutoff,
        "Status": status
    }


def main():
    print("=== Indoor Obstacle Course Test (IOCT) Calculator ===")
    
    # User input
    try:
        time_sec = float(input("Enter completion time (in seconds): "))
        penalties = int(input("Enter number of penalties: "))
        gender = input("Enter gender (male/female): ").strip().lower()
    except ValueError:
        print("Invalid input. Please enter numeric values for time and penalties.")
        return

    # Calculate results
    results = calculate_ioct(time_sec, penalties, gender=gender)

    # Display results
    print("\n=== IOCT Results ===")
    for key, value in results.items():
        print(f"{key}: {value}")


if __name__ == "__main__":
    main()
