def body_density_7site(sum7, age, sex="male"):
    if sex.lower() == "male":
        return 1.112 - (0.00043499 * sum7) + (0.00000055 * (sum7 ** 2)) - (0.00028826 * age)
    elif sex.lower() == "female":
        return 1.097 - (0.00046971 * sum7) + (0.00000056 * (sum7 ** 2)) - (0.00012828 * age)
    else:
        raise ValueError("Sex must be 'male' or 'female'")

def body_fat_percent(body_density):
    return (495 / body_density) - 450

if __name__ == "__main__":
    print("=== 7-Site Skinfold Test Calculator ===")

    chest = float(input("Chest (mm): "))
    axilla = float(input("Axilla (mm): "))
    tricep = float(input("Tricep (mm): "))
    subscap = float(input("Subscapular (mm): "))
    abdomen = float(input("Abdomen (mm): "))
    suprailiac = float(input("Suprailiac (mm): "))
    thigh = float(input("Thigh (mm): "))
    age = int(input("Age (years): "))
    sex = input("Sex (male/female): ")

    sum7 = chest + axilla + tricep + subscap + abdomen + suprailiac + thigh
    bd = body_density_7site(sum7, age, sex)
    bf = body_fat_percent(bd)

    print("\n--- Results ---")
    print(f"Sum of 7 Skinfolds: {sum7:.1f} mm")
    print(f"Body Density: {bd:.4f} g/cm³")
    print(f"Body Fat %: {bf:.1f}%")
