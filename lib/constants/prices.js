import { params }   from "@ampt/sdk";

export default {
    minimum: {
        from: 0,
        to: 0.0225,
        price: +params( 'PRICE_0-00225' ),
        coeff: false
    },
    small: {
        from: 0.0225,
        to: 0.5,
        price: +params( 'PRICE_00225-05' ),
        coeff: +params( 'COEFF_00225-05' )
    },
    medium: {
        from: 0.5,
        to: 1,
        price: +params( 'PRICE_05-1' ),
        coeff: +params( 'COEFF_05-1' )
    },
    big: {
        from: 1,
        to: Number.POSITIVE_INFINITY,
        price: +params( 'PRICE_1-INF' ),
        coeff: +params( 'COEFF_1-INF' )
    }
}