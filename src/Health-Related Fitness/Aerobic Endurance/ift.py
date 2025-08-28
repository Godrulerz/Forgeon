def thirty_fifteen_ift():
    print("=== 30-15 Intermittent Fitness Test (30-15 IFT) ===")

    final_speed = float(input("Enter Final Speed (km/h): "))
    total_distance = float(input("Enter Total Distance (m): "))

    max_heart_rate_input = input("Enter Max Heart Rate (bpm) [optional]: ")
    coach_notes = input("Enter Coach Notes [optional]: ")

    max_heart_rate = max_heart_rate_input if max_heart_rate_input.strip() else "Not provided"
    coach_notes = coach_notes if coach_notes.strip() else "None"

    print("\n--- 30-15 IFT Results ---")
    print(f"Final Speed     : {final_speed} km/h")
    print(f"Total Distance  : {total_distance} m")
    print(f"Max Heart Rate  : {max_heart_rate}")
    print(f"Coach Notes     : {coach_notes}")


if __name__ == "__main__":
    thirty_fifteen_ift()
