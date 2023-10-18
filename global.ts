import { Buffer } from 'buffer';
import 'react-native-get-random-values';

global.crypto.getRandomValues;
global.Buffer = Buffer;
