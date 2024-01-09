export default {
    minimum: {
        from: 0,
        to: 0.0225,
        price: 8.40,
        coeff: false
    },
    small: {
        from: 0.0225,
        to: 0.5,
        price: 7.81,
        coeff: 26.38
    },
    medium: {
        from: 0.5,
        to: 1,
        price: 12.60,
        coeff: 16.81
    },
    big: {
        from: 1,
        to: Number.POSITIVE_INFINITY,
        price: 3.80,
        coeff: 25.61
    }
}