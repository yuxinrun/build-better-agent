import type { Chapter } from '../types'
import { ch1 } from './ch1'
import { ch2 } from './ch2'
import { ch3 } from './ch3'
import { ch4 } from './ch4'
import { ch5 } from './ch5'
import { ch6 } from './ch6'
import { ch7 } from './ch7'
import { ch8 } from './ch8'
import { ch9 } from './ch9'
import { ch10 } from './ch10'

export const chapters: Chapter[] = [ch1, ch2, ch3, ch4, ch5, ch6, ch7, ch8, ch9, ch10]

export function getChapter(slug: string) {
  return chapters.find((chapter) => chapter.slug === slug)
}

export function getNeighbours(slug: string) {
  const index = chapters.findIndex((chapter) => chapter.slug === slug)
  return {
    prev: index > 0 ? chapters[index - 1] : null,
    next: index >= 0 && index < chapters.length - 1 ? chapters[index + 1] : null,
  }
}
