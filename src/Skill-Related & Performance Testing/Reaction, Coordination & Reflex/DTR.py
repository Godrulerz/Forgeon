def analyze_dtr(reflex_name, left_grade, right_grade):
    """
    Analyze Deep Tendon Reflex (DTR) grades.
    
    Parameters:
        reflex_name (str): Name of reflex tested (e.g., 'Patellar')
        left_grade (int): Left side reflex grade (0–4)
        right_grade (int): Right side reflex grade (0–4)
    
    Returns:
        dict: Analysis summary
    """
    # Grading interpretation
    grading_scale = {
        0: "No response (Areflexia)",
        1: "Diminished (Hyporeflexia)",
        2: "Normal response",
        3: "Brisk (may be normal)",
        4: "Very brisk / Clonus (Abnormal)"
    }
    
    # Validate input
    if left_grade not in grading_scale or right_grade not in grading_scale:
        raise ValueError("Grades must be between 0 and 4.")
    
    # Symmetry check
    symmetry = "Yes" if left_grade == right_grade else "No"
    
    # Abnormal flag
    abnormalities = []
    if left_grade in [0, 4] or right_grade in [0, 4]:
        abnormalities.append("Abnormal reflex detected")
    if left_grade != right_grade:
        abnormalities.append("Asymmetry detected")
    
    return {
        "Reflex Tested": reflex_name,
        "Left Grade": f"{left_grade} ({grading_scale[left_grade]})",
        "Right Grade": f"{right_grade} ({grading_scale[right_grade]})",
        "Symmetry": symmetry,
        "Abnormalities": abnormalities if abnormalities else ["None"]
    }

def main():
    print("=== Deep Tendon Reflexes (DTR) Assessment ===")
    print("Grades: 0 = Areflexia, 1 = Hyporeflexia, 2 = Normal, 3 = Brisk, 4 = Clonus\n")
    
    reflexes = ["Biceps", "Triceps", "Brachioradialis", "Patellar", "Achilles"]
    results = []
    
    for reflex in reflexes:
        try:
            left = int(input(f"Enter LEFT grade for {reflex} reflex (0–4): "))
            right = int(input(f"Enter RIGHT grade for {reflex} reflex (0–4): "))
            results.append(analyze_dtr(reflex, left, right))
        except ValueError as e:
            print(f"Invalid input for {reflex}: {e}")
    
    print("\n--- DTR Results Summary ---")
    for r in results:
        print(f"\nReflex: {r['Reflex Tested']}")
        print(f" Left: {r['Left Grade']}")
        print(f" Right: {r['Right Grade']}")
        print(f" Symmetry: {r['Symmetry']}")
        print(f" Abnormalities: {', '.join(r['Abnormalities'])}")

if __name__ == "__main__":
    main()
