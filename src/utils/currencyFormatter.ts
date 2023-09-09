export const formatter = (nominal: number) => {
    const usd = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });

    return `US${usd.format(nominal)}`;
};