export const handleMonitorApiRequests = (happening: any) => {
  /**
   *  - This will allow you do the following
   *  - check for headers and record values
   *  - determine if you need to trigger other parts of your code
   *  - measure performance of API calls
   *  - perform logging
   *  Additionally Monitors are run just before the promise is resolved. You get an early sneak peak at what will come back. You cannot change anything, just look.
   */

  switch (happening.status) {
    case happening.status === 200 && happening.status <= 299:
      console.log('====================================')
      console.log('✅ API MONITOR 📈 REQUEST SUCEESSFUL')
      console.log(`✅ Status Code: ${happening.status}`)
      console.log(`hasData ${!!happening?.data}`)
      console.log(`Data: ${happening.data && JSON.stringify(happening.data)}`)
      console.log('====================================')
      break

    default:
      console.log('====================================')
      console.log('❌ API MONITOR 📈 REQUEST FAILED 👀 👀')
      console.log(`❌ Status Code: ${happening.status}`)
      console.log(`❌ originalError ${happening.originalError.message}`)
      console.log(`hasData ${JSON.stringify(happening)}`)
      console.log(
        `❌ errorMessage: ${
          happening.data?.message || happening.data?.details
        }`,
      )
      console.log('====================================')
      break
  }
}
