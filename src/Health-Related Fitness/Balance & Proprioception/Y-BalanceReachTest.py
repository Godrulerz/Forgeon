def y_balance_test():
    print("=== Y-Balance Reach Test ===")

    leg_tested = input("Enter Leg Tested (Left/Right): ")

    anterior = [
        float(input("Enter Anterior Reach 1 (cm): ")),
        float(input("Enter Anterior Reach 2 (cm): ")),
        float(input("Enter Anterior Reach 3 (cm): "))
    ]

    posteromedial = [
        float(input("Enter Posteromedial Reach 1 (cm): ")),
        float(input("Enter Posteromedial Reach 2 (cm): ")),
        float(input("Enter Posteromedial Reach 3 (cm): "))
    ]

    posterolateral = [
        float(input("Enter Posterolateral Reach 1 (cm): ")),
        float(input("Enter Posterolateral Reach 2 (cm): "))
    ]

    anterior_avg = sum(anterior) / len(anterior)
    posteromedial_avg = sum(posteromedial) / len(posteromedial)
    posterolateral_avg = sum(posterolateral) / len(posterolateral)

    composite_score = (anterior_avg + posteromedial_avg + posterolateral_avg) / 3

    print("\n--- Y-Balance Test Results ---")
    print(f"Leg Tested            : {leg_tested}")
    print(f"Anterior Avg          : {anterior_avg:.2f} cm")
    print(f"Posteromedial Avg     : {posteromedial_avg:.2f} cm")
    print(f"Posterolateral Avg    : {posterolateral_avg:.2f} cm")
    print(f"Composite Reach Score : {composite_score:.2f} cm")


if __name__ == "__main__":
    y_balance_test()
