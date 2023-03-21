import { Injectable } from '@nestjs/common'
import * as argon2 from 'argon2'
import { HashDto, VerifyDto } from './dto'

/**
 * #### Business layer for `hash` module
 *
 * @class HashService
 */
@Injectable()
export class HashService {
  /**
   * Hashes the plain string with argon2
   *
   * @param hashDto DTO that contains plain string which is going to be hashed
   * @returns hash
   */
  async hash(hashDto: HashDto) {
    const hashed = await argon2.hash(hashDto.plain, { type: 2 })
    return hashed
  }

  /**
   * Verifies the hash string with argon2
   *
   * @param verifyDto DTO that contains plain string and hash to verify hash by plain string
   * @returns true or false by verification
   */
  async verify(verifyDto: VerifyDto) {
    return argon2.verify(verifyDto.hash, verifyDto.plain, { type: 2 })
  }
}
