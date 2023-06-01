const swDev = () => {
  const swURL = `${process.env.PUBLIC_URL}/sw.js`;
  navigator.serviceWorker.register(swURL)
    .then(response => {
      console.log('sw registered successfully')
    })
}

export default swDev;