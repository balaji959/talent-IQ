export const getDifficultyBadgeClass = (difficulty) => {
    switch (difficulty.toLowerCase()){
        case "easy":
            return "bade-success";
            case "medium":
                return "bad-warning";
                case "hard":
                    return "bade-error";
                    default:
                        return "badge-ghost";
    }
}