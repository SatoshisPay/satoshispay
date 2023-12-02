import { Buffer } from 'buffer';
import 'text-encoding';
import 'react-native-get-random-values';

global.crypto.getRandomValues;
global.Buffer = Buffer;
