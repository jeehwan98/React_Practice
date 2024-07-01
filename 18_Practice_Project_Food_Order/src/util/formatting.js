export const currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});

// 한국 원으로 바꿀 때 사용하는 logic
// export const currencyFormatter = new Intl.NumberFormat('ko-KR', {
//     style: 'currency',
//     currency: 'KRW',
// });