def imtp_peak_force():
    print("=== IMTP Peak Force Test (Isometric Mid-Thigh Pull) ===")
    print("Enter athlete trial data (type 'done' to finish)\n")

    records = []

    while True:
        athlete = input("Athlete Name (or 'done' to stop): ")
        if athlete.lower() == "done":
            break

        peak_force = float(input("Peak Force (N): "))
        trial1 = float(input("Trial 1 (N): "))
        trial2 = float(input("Trial 2 (N): "))
        trial3 = float(input("Trial 3 (N): "))

        # Optional RFD
        rfd = input("RFD (0–200ms) (N/s) [optional]: ")
        rfd = float(rfd) if rfd.strip() else None

        best_peak_force = max(trial1, trial2, trial3)

        record = {
            "Athlete": athlete,
            "Peak Force (N)": peak_force,
            "Trial 1 (N)": trial1,
            "Trial 2 (N)": trial2,
            "Trial 3 (N)": trial3,
            "Best Peak Force (N)": best_peak_force,
            "RFD (N/s)": rfd if rfd else "-"
        }
        records.append(record)
        print("\n✅ Entry recorded!\n")

    print("\n--- IMTP Peak Force Results ---")
    for r in records:
        print(
            f"Athlete: {r['Athlete']} | "
            f"PF={r['Peak Force (N)']}N | "
            f"T1={r['Trial 1 (N)']}N, T2={r['Trial 2 (N)']}N, T3={r['Trial 3 (N)']}N → "
            f"Best PF={r['Best Peak Force (N)']}N | "
            f"RFD={r['RFD (N/s)']}"
        )


if __name__ == "__main__":
    imtp_peak_force()
