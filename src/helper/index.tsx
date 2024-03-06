/* eslint-disable semi */

/* eslint-disable no-unneeded-ternary */
// import useNetInfo from '@react-native-community/netinfo'
import moment from 'moment'

import {
  CarouselItemParalax,
  ChatRoomListItem,
  ConversionType,
  ImageItem,
  Location,
  MatchMessage,
  MatchUserListItem,
  Message,
  SavedProfile,
  SearchPassionItem,
  SwipedMatch,
  UpdatedSavedProfile,
} from 'src/utils/shared-type'

// const netInfo = useNetInfo.useNetInfo()

export const isEmpty = (obj: { hasOwnProperty: (arg0: string) => any }) => {
  for (const prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      return false
    }
  }
  return true
}

export const getTheMinimumSelectableYear = () => {
  const today = new Date()
  const day = today.getDate()
  const month = today.getMonth() + 1
  const year = today.getFullYear() - 18

  return `${year}-${month.toString().length === 1 ? '0' + month : month}-${
    day.toString().length === 1 ? '0' + day : day
  }`
}

export const addRemoveArray = <T,>(array: T[], item: T): T[] => {
  const index = array.indexOf(item)
  if (index !== -1) {
    // item exists in array, remove it
    return [...array.slice(0, index), ...array.slice(index + 1)]
  } else {
    // item does not exist in array, add it
    return [...array, item]
  }
}

export const getAccroNames = (
  firstName: string | any,
  lastName: string | any,
) => {
  if (firstName && lastName) {
    const initial = `${firstName.substring(0, 1)}${lastName.substring(
      0,
      1,
    )}`.toUpperCase()

    return initial
  }

  return ''
}

export function searchChatRoomListItems(
  searchStr: string,
  items: ChatRoomListItem[],
): ChatRoomListItem[] {
  const filteredItems = items.filter(item => {
    const { user } = item
    const name = `${user.first_name} ${user.last_name}`

    return (
      user.username.toLowerCase().includes(searchStr.toLowerCase()) ||
      name.toLowerCase().includes(searchStr.toLowerCase())
    )
  })
  return filteredItems
}

export function getCurrentDate(): string {
  const now: Date = new Date()
  const isoString: string = now.toISOString()
  return isoString
}

export async function getLocationName({ latitude, longitude }: Location) {
  const apiKey = '<YOUR_API_KEY_HERE>'

  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`

  try {
    const response = await fetch(url)
    const data = await response.json()

    if (data.status === 'OK') {
      return data.results[0].formatted_address
    } else {
      console.log('Geocoding failed:', data.status)
      return null
    }
  } catch (error) {
    console.log('Error in geocoding:', error)
    return null
  }
}

export function convertDistance(
  distance: number,
  conversionType: ConversionType,
): number {
  let convertedDistance: number

  if (conversionType === 'kmToMi') {
    // convert kilometers to miles
    convertedDistance = distance / 1.609
  } else if (conversionType === 'miToKm') {
    // convert miles to kilometers
    convertedDistance = distance * 1.609
  } else {
    throw new Error('Invalid conversion type. Must be "kmToMi" or "miToKm".')
  }

  // round the converted distance to the nearest integer
  return Math.round(convertedDistance)
}

export function sortItemsByIncreasingId(items: Message[]): Message[] {
  // Sort the items in ascending order by their IDs
  return items.sort((a, b) => a.id - b.id)
}

export const checkAndUpdateImageArray = (
  imageArray: ImageItem[],
  base64Image: string,
): ImageItem[] => {
  const imageExists = imageArray.some(item => item.encoded_file === base64Image)

  if (imageExists) {
    const updatedArray = imageArray.filter(
      item => item.encoded_file !== base64Image,
    )
    return updatedArray
  } else {
    const currentTimeMillis = new Date().getTime()
    const newImageItem: ImageItem = {
      encoded_file: base64Image,
      name: currentTimeMillis.toString(),
      type: 'PHOTO',
      is_default: isEmpty(imageArray) ? true : false,
    }
    const updatedArray = [...imageArray, newImageItem]
    return updatedArray
  }
}

export const updateBantuzUser = (
  storedUser: SavedProfile,
  newUser: UpdatedSavedProfile,
): SavedProfile => {
  if (newUser?.username) {
    return {
      username: newUser?.username || storedUser.username,
      first_name: newUser?.first_name || storedUser.first_name,
      email: newUser?.email || storedUser.email,
      last_name: newUser?.last_name || storedUser.last_name,
      middle_name: newUser?.middle_name || storedUser.middle_name,
      phone: newUser?.phone || storedUser.phone,
      profile: {
        birth_date:
          newUser?.profile.birth_date || storedUser.profile.birth_date,
        gender: newUser?.profile.gender || storedUser.profile.gender,
        height: newUser?.profile.height || storedUser.profile.height,
        physical_frame:
          newUser?.profile.physical_frame || storedUser.profile.physical_frame,
        ethnicity: newUser?.profile.ethnicity || storedUser.profile.ethnicity,
        location: {
          id: newUser?.profile.location.id || storedUser.profile.location.id,
          google_place_id:
            newUser?.profile.location.google_place_id ||
            storedUser.profile.location.google_place_id,
          name:
            newUser?.profile.location.name || storedUser.profile.location.name,
          longitude:
            newUser?.profile.location.longitude ||
            storedUser.profile.location.longitude,
          latitude:
            newUser?.profile.location.latitude ||
            storedUser.profile.location.latitude,
        },
        media: newUser?.profile.media || storedUser.profile.media,
        bio: {
          bio: newUser?.profile.bio.bio || storedUser.profile.bio.bio,
          looking_for:
            newUser?.profile.bio.looking_for ||
            storedUser.profile.bio.looking_for,
          languages:
            newUser?.profile.bio.languages || storedUser.profile.bio.languages,
          passions:
            newUser?.profile.bio.passions || storedUser.profile.bio.passions,
          other_details:
            newUser?.profile.bio.other_details ||
            storedUser.profile.bio.other_details,
        },
      },
      is_premium: newUser?.is_premium || storedUser.is_premium,
      token: storedUser.token,
      id: newUser?.id || storedUser.id,
      status: newUser?.status || storedUser.status,
      created_on: newUser?.created_on || storedUser.created_on,
      last_modified_on:
        newUser?.last_modified_on || storedUser.last_modified_on,
    }
  } else {
    return storedUser
  }
}

export const getOtherSwipe = (
  data: MatchUserListItem,
  username: string,
): MatchMessage | null => {
  if (data.swipe_a.user.username !== username) {
    return data.swipe_a
  } else if (data.swipe_b.user.username !== username) {
    return data.swipe_b
  }
  return null
}

export function checkRelativeTime(date: string): string {
  const now = moment()
  const givenDate = moment(date, 'YYYY-MM-DDTHH:mm:ss.SSSSSSZ')

  if (givenDate.isSame(now, 'day')) {
    return 'Now'
  } else if (givenDate.isSame(now.subtract(1, 'minute'), 'minute')) {
    return 'A minute ago'
  } else if (givenDate.isSame(now.subtract(24, 'hours'), 'day')) {
    return 'Yesterday'
  } else if (givenDate.isSame(now, 'year')) {
    return givenDate.format('HH:mm') // Time in 24-hour format
  } else {
    return givenDate.format('DD MMM YYYY') // Custom format (e.g., 23 Apr 2023)
  }
}

export function searchPassionByName(
  items: SearchPassionItem[],
  searchName: string,
): SearchPassionItem[] {
  const matchingItems: SearchPassionItem[] = []

  for (const item of items) {
    if (item.name.toLowerCase().includes(searchName.toLowerCase())) {
      matchingItems.push(item)
    }
  }

  return matchingItems
}

export function shiftItemToFirstPosition<T extends { id: string }>(
  array: T[],
  item: T,
): T[] {
  const shiftedArray = array.filter(arrItem => arrItem.id !== item.id)
  shiftedArray.unshift(item)
  return shiftedArray
}

export function replaceDefaultImage(
  images: CarouselItemParalax[],
  newImage: CarouselItemParalax,
): CarouselItemParalax[] {
  images.filter(item => {
    if (item.id === newImage.id) {
      item.is_default = true
    } else {
      item.is_default = false
    }
  })
  return images
}

export function addOrRemoveItem<T>(array: T[], item: T): T[] {
  let isPresent = false
  let indexx = 0

  array.filter((element, index) => {
    //@ts-ignore
    if (element.id === item.id) {
      isPresent = true
      indexx = index
    }
  })

  const index = array.indexOf(item)

  if (isPresent) {
    // Item is already in the array, so remove it
    array.splice(index, indexx)
  }

  // else {
  //   // Item is not in the array, so add it
  //   array.push(item)
  // }

  return array
}

export function itemIsPresent<T>(array: T[], item: T): boolean {
  let isPresent = false

  array.filter(element => {
    //@ts-ignore
    if (element.id === item.id) {
      isPresent = true
    }
  })

  return isPresent
}

export const getOtherUserOnMatch = (
  Item: MatchUserListItem,
  currentUser: string,
): SwipedMatch | null => {
  if (Item.swipe_a.user.username === currentUser) {
    return Item.swipe_a.user_swiped
  }

  if (Item.swipe_b.user.username === currentUser) {
    return Item.swipe_b.user_swiped
  }

  return null
}

export const getUserMessageBubbleItem = (
  messages: Message[],
  currentUser: string,
  currentIndex: number,
): {
  isCurrent: boolean
  position: 1 | 2 | 3
} => {
  if (currentIndex > 0 && messages.length - 1 !== currentIndex) {
    const previous = messages[currentIndex - 1]
    const current = messages[currentIndex]
    const next = messages[currentIndex + 1]

    //this is an item somewhere in between the first item and the last item
    // check for item at current index-1 and at current index+1 to access previous and next
    // checks when this is the current user
    if (
      previous.sender === currentUser &&
      current.sender === currentUser &&
      next.sender === currentUser
    ) {
      //return this is current user and the 2 style is to be renderd since it is at  the center
      return {
        isCurrent: true,
        position: 2,
      }
    } else if (
      previous.sender !== currentUser &&
      current.sender === currentUser
    ) {
      // This means that this is the very top text for this user
      return {
        isCurrent: true,
        position: 1,
      }
    } else if (
      next.sender !== currentUser &&
      current.sender === currentUser &&
      previous.sender === currentUser
    ) {
      // This is the last element in the series
      return {
        isCurrent: true,
        position: 3,
      }
    }
    // end check if this is current user and start check if it is the other user
    else if (
      previous.sender !== currentUser &&
      current.sender !== currentUser &&
      next.sender !== currentUser
    ) {
      //return this is current user and the 2 style is to be renderd since it is at  the center
      return {
        isCurrent: false,
        position: 2,
      }
    } else if (
      previous.sender === currentUser &&
      current.sender !== currentUser
    ) {
      // This means that this is the very top text for this user
      return {
        isCurrent: false,
        position: 1,
      }
    } else if (
      next.sender === currentUser &&
      current.sender !== currentUser &&
      previous.sender !== currentUser
    ) {
      // This is the last element in the series
      return {
        isCurrent: false,
        position: 3,
      }
    } else {
      return {
        isCurrent: false,
        position: 1,
      }
    }
  } else if (currentIndex > 0 && messages.length - 1 === currentIndex) {
    // this is the very last item so there is no i+1
    const previous = messages[currentIndex - 1]
    const current = messages[currentIndex]

    if (previous.sender === currentUser && current.sender === currentUser) {
      return {
        isCurrent: true,
        position: 3,
      }
    } else if (
      previous.sender !== currentUser &&
      current.sender === currentUser
    ) {
      return {
        isCurrent: true,
        position: 1,
      }
    } else if (
      previous.sender !== currentUser &&
      current.sender !== currentUser
    ) {
      return {
        isCurrent: false,
        position: 3,
      }
    } else {
      return {
        isCurrent: false,
        position: 1,
      }
    }
  } else {
    const current = messages[currentIndex]
    if (currentIndex === 0) {
      //this is the very first item in the list so there is no i-1
      if (current.sender === currentUser) {
        return {
          isCurrent: true,
          position: 1,
        }
      } else {
        return {
          isCurrent: false,
          position: 1,
        }
      }
    } else {
      //this is the very first item in the list so there is no i-1
      if (current.sender === currentUser) {
        return {
          isCurrent: true,
          position: 1,
        }
      } else {
        return {
          isCurrent: false,
          position: 1,
        }
      }
    }
  }
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()

  // Check if the time is below one minute
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)
  if (diffInSeconds < 60) {
    return 'now'
  }

  // Check if it is today
  if (
    date.getFullYear() === now.getFullYear() &&
    date.getMonth() === now.getMonth() &&
    date.getDate() === now.getDate()
  ) {
    return `Today ${formatTime(date)}`
  }

  // Check if it is yesterday
  const yesterday = new Date(now)
  yesterday.setDate(now.getDate() - 1)
  if (
    date.getFullYear() === yesterday.getFullYear() &&
    date.getMonth() === yesterday.getMonth() &&
    date.getDate() === yesterday.getDate()
  ) {
    return `Yesterday ${formatTime(date)}`
  }

  // Check if it is within the current week
  const diffInDays = Math.floor(
    (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24),
  )
  if (diffInDays <= now.getDay()) {
    return `${formatDayOfWeek(date)} ${formatTime(date)}`
  }

  // Return reference to month, year, and time
  return `${formatMonth(date)} ${date.getFullYear()} ${formatTime(date)}`
}

function formatTime(date: Date): string {
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  return `${hours}:${minutes}`
}

function formatDayOfWeek(date: Date): string {
  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
  return daysOfWeek[date.getDay()]
}

function formatMonth(date: Date): string {
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]
  return months[date.getMonth()]
}

export const getDefaultImage = (
  items: CarouselItemParalax[],
): string | null => {
  let isDefault = null
  items.filter(item => {
    if (item.is_default) {
      isDefault = item.path
    }
  })

  return isDefault
}
