import { LogLevel } from '@nestjs/common';
import { hash, genSalt, compare } from 'bcrypt';

import { Duplex } from 'stream';

export function bufferToStream(buffer: Buffer) {
    const stream = new Duplex();
    stream.push(buffer);
    stream.push(null);
    return stream;
}


const _hash = async (password: string, saltRounds = 10): Promise<{ salt: number, hash: string }> => {
    const salt = await genSalt(saltRounds);
    return new Promise((rs, rj) => {
        hash(password, salt, (err, _hash) => {
            if (err != null) {
                rj(err)
                return;
            }
            rs({ salt, hash: _hash });
        });
    })
}



const _compare = (hash: string, password: string): Promise<boolean> => {
    return new Promise((rs, rj) => {
        compare(password, hash, (err, match) => {
            if (err != null) {
                rj(err);
                return

            }
            rs(match)
        });
    })
};

export const bcrypt = {
    hash: _hash,
    compare: _compare
};
export function round(v: number) {
    return ((Number.EPSILON + v) * 1e2) / 1e2;
}

export function logLevels(systemLogLevels?: string) {
    const allLogLevels: LogLevel[] = ['verbose', 'debug', 'log', 'warn', 'error', 'fatal'];
    const levels = allLogLevels.slice(
        allLogLevels.indexOf((systemLogLevels || 'debug') as LogLevel),
        allLogLevels.length,
    );
    return levels;
}
