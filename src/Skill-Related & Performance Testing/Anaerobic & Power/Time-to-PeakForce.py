def time_to_peak_force(force_values, sampling_rate):
    """
    Calculate Time-to-Peak Force (TTPF).
    
    Parameters:
        force_values (list[float]): Force-time data (N)
        sampling_rate (float): Sampling rate in Hz
    
    Returns:
        dict with peak force, time-to-peak (ms), and index info
    """
    if not force_values or sampling_rate <= 0:
        raise ValueError("Invalid input: provide force values and positive sampling rate.")
    
    # Baseline (first 100 ms or so); here take average of first 50 samples
    baseline = sum(force_values[:50]) / min(50, len(force_values))

    # Force onset = first point exceeding baseline + 5% of peak (common method)
    peak_force = max(force_values)
    threshold = baseline + 0.05 * (peak_force - baseline)
    
    onset_index = next((i for i, f in enumerate(force_values) if f >= threshold), 0)
    peak_index = force_values.index(peak_force)
    
    # Time difference in ms
    time_to_peak = (peak_index - onset_index) / sampling_rate * 1000
    
    return {
        "Peak Force (N)": round(peak_force, 2),
        "Onset Index": onset_index,
        "Peak Index": peak_index,
        "Time-to-Peak Force (ms)": round(time_to_peak, 2),
    }


def main():
    print("=== Time-to-Peak Force (TTPF) Calculator ===")
    
    sampling_rate = float(input("Enter sampling rate (Hz): "))
    print("Enter force values separated by spaces (e.g., 10 15 30 100 200 350 400):")
    force_values = list(map(float, input().split()))
    
    results = time_to_peak_force(force_values, sampling_rate)
    
    print("\n--- Results ---")
    for k, v in results.items():
        print(f"{k}: {v}")


if __name__ == "__main__":
    main()
