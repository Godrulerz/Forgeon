def analyze_h_reflex(latency_ms, h_amplitude_mV, m_amplitude_mV):
    """
    Analyze Hoffmann's Reflex (H-reflex) data.

    Parameters:
        latency_ms (float): Latency of H-wave in milliseconds
        h_amplitude_mV (float): H-wave amplitude in millivolts
        m_amplitude_mV (float): M-wave amplitude in millivolts

    Returns:
        dict: Analysis summary
    """
    results = {}

    # Store raw values
    results["H-reflex Latency (ms)"] = latency_ms
    results["H-wave Amplitude (mV)"] = h_amplitude_mV
    results["M-wave Amplitude (mV)"] = m_amplitude_mV

    # Calculate H/M Ratio (if M-wave > 0)
    if m_amplitude_mV > 0:
        hm_ratio = (h_amplitude_mV / m_amplitude_mV) * 100
    else:
        hm_ratio = None

    results["H/M Ratio (%)"] = hm_ratio

    # Interpretation
    interpretation = []

    # Latency interpretation
    if latency_ms < 25:
        interpretation.append("Latency within expected range")
    else:
        interpretation.append("Prolonged latency – may indicate neuropathy")

    # Amplitude interpretation
    if h_amplitude_mV <= 0:
        interpretation.append("No measurable H-reflex response")
    elif hm_ratio and hm_ratio > 50:
        interpretation.append("High H/M ratio – may suggest hyperreflexia")
    else:
        interpretation.append("Amplitude values appear within typical limits")

    results["Interpretation"] = interpretation

    return results


def main():
    print("=== Hoffmann's Reflex (H-reflex) Analysis ===")
    try:
        latency = float(input("Enter H-reflex latency (ms): "))
        h_amp = float(input("Enter H-wave amplitude (mV): "))
        m_amp = float(input("Enter M-wave amplitude (mV): "))

        analysis = analyze_h_reflex(latency, h_amp, m_amp)

        print("\n--- H-reflex Results ---")
        for k, v in analysis.items():
            if isinstance(v, list):
                print(f"{k}:")
                for item in v:
                    print(f"  - {item}")
            else:
                print(f"{k}: {v}")

    except ValueError:
        print("Invalid input. Please enter numeric values.")


if __name__ == "__main__":
    main()
