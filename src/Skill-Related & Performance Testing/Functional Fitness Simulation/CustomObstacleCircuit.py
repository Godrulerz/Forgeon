# Custom Obstacle Circuit Performance Calculator

def calculate_custom_circuit(obstacles, cutoff_time=None):
    """
    Calculate performance for a custom obstacle circuit.

    Args:
        obstacles (list of dict): Each dict has:
            - "name": str (obstacle name)
            - "time": float (time in seconds to complete obstacle)
            - "penalties": int (number of penalties at obstacle)
            - "penalty_time": float (seconds added per penalty, default 5)
        cutoff_time (float, optional): Pass/Fail cutoff time.

    Returns:
        dict: Detailed results including adjusted time and status.
    """

    total_time = 0.0
    total_penalty_time = 0.0

    details = []

    for obs in obstacles:
        penalty_sec = obs.get("penalty_time", 5.0) * obs.get("penalties", 0)
        raw_time = obs["time"]
        adj_time = raw_time + penalty_sec

        total_time += raw_time
        total_penalty_time += penalty_sec

        details.append({
            "Obstacle": obs["name"],
            "Raw Time (s)": raw_time,
            "Penalties": obs.get("penalties", 0),
            "Penalty Time (s)": penalty_sec,
            "Adjusted Time (s)": adj_time
        })

    final_adjusted = total_time + total_penalty_time

    result = {
        "Details": details,
        "Total Raw Time (s)": total_time,
        "Total Penalty Time (s)": total_penalty_time,
        "Final Adjusted Time (s)": final_adjusted,
    }

    if cutoff_time:
        result["Cutoff (s)"] = cutoff_time
        result["Status"] = "PASS" if final_adjusted <= cutoff_time else "FAIL"

    return result


def main():
    print("=== Custom Obstacle Circuit Calculator ===")

    obstacles = []
    num_obs = int(input("Enter number of obstacles: "))

    for i in range(num_obs):
        print(f"\n--- Obstacle {i+1} ---")
        name = input("Obstacle name: ")
        time = float(input("Completion time (s): "))
        penalties = int(input("Number of penalties: "))
        penalty_time = input("Penalty time per penalty (default 5s): ")
        penalty_time = float(penalty_time) if penalty_time else 5.0

        obstacles.append({
            "name": name,
            "time": time,
            "penalties": penalties,
            "penalty_time": penalty_time
        })

    cutoff = input("\nEnter cutoff time (s) for pass/fail (optional): ")
    cutoff_time = float(cutoff) if cutoff else None

    results = calculate_custom_circuit(obstacles, cutoff_time)

    print("\n=== Results ===")
    for d in results["Details"]:
        print(f"{d['Obstacle']}: Raw={d['Raw Time (s)']}s, Penalties={d['Penalties']}, "
              f"Penalty Time={d['Penalty Time (s)']}s, Adjusted={d['Adjusted Time (s)']}s")

    print("\n--- Summary ---")
    print(f"Total Raw Time: {results['Total Raw Time (s)']} s")
    print(f"Total Penalty Time: {results['Total Penalty Time (s)']} s")
    print(f"Final Adjusted Time: {results['Final Adjusted Time (s)']} s")

    if "Cutoff (s)" in results:
        print(f"Cutoff: {results['Cutoff (s)']} s")
        print(f"Status: {results['Status']}")


if __name__ == "__main__":
    main()
