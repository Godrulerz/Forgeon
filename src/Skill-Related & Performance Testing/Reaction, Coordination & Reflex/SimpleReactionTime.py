import statistics

def analyze_reaction_times(trial_times):
    """
    Analyze reaction time test results.
    
    Parameters:
        trial_times (list): List of reaction times in milliseconds
    
    Returns:
        dict: Average, best, and consistency (std deviation)
    """
    if not trial_times:
        return None
    
    avg_time = statistics.mean(trial_times)
    best_time = min(trial_times)
    consistency = statistics.pstdev(trial_times) if len(trial_times) > 1 else 0.0
    
    return {
        "Trials": trial_times,
        "Average Reaction Time (ms)": round(avg_time, 2),
        "Best Reaction Time (ms)": round(best_time, 2),
        "Consistency (SD, ms)": round(consistency, 2)
    }

def main():
    print("=== Simple Reaction Time Test (Light vs Sound) ===")
    
    # Light trials
    print("\nEnter LIGHT reaction times (ms). Type 'done' when finished.")
    light_trials = []
    while True:
        entry = input("Light trial: ")
        if entry.lower() == "done":
            break
        try:
            light_trials.append(float(entry))
        except ValueError:
            print("Invalid input. Enter a number or 'done'.")
    
    # Sound trials
    print("\nEnter SOUND reaction times (ms). Type 'done' when finished.")
    sound_trials = []
    while True:
        entry = input("Sound trial: ")
        if entry.lower() == "done":
            break
        try:
            sound_trials.append(float(entry))
        except ValueError:
            print("Invalid input. Enter a number or 'done'.")
    
    print("\n--- Results ---")
    
    if light_trials:
        light_results = analyze_reaction_times(light_trials)
        print("\nLIGHT Trials:")
        for k, v in light_results.items():
            print(f"  {k}: {v}")
    else:
        print("\nNo LIGHT trial data entered.")
    
    if sound_trials:
        sound_results = analyze_reaction_times(sound_trials)
        print("\nSOUND Trials:")
        for k, v in sound_results.items():
            print(f"  {k}: {v}")
    else:
        print("\nNo SOUND trial data entered.")
    
    # Combined summary
    all_trials = light_trials + sound_trials
    if all_trials:
        combined_results = analyze_reaction_times(all_trials)
        print("\nCOMBINED Summary (Light + Sound):")
        for k, v in combined_results.items():
            print(f"  {k}: {v}")
    else:
        print("\nNo trial data entered for Light or Sound.")

if __name__ == "__main__":
    main()
