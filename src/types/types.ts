export interface HabitType {
    id: number,
    finalGoal: String,
    steps: String[]
    selectedDays: boolean[]
    reminder: boolean
    habitTimes: String[]
    financialIncentive: {
        active: boolean
        amount: number
        lockTimeNumber: number
        lockTimeType: String
    }
}