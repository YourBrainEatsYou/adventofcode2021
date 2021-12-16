// @ts-nocheck
//bits = 'C20D59802D2B0B6713C6B4D1600ACE7E3C179BFE391E546CC017F004A4F513C9D973A1B2F32C3004E6F9546D005840188C51DA298803F1863C42160068E5E37759BC4908C0109E76B00425E2C530DE40233CA9DE8022200EC618B10DC001098EF0A63910010D3843350C6D9A252805D2D7D7BAE1257FD95A6E928214B66DBE691E0E9005F7C00BC4BD22D733B0399979DA7E34A6850802809A1F9C4A947B91579C063005B001CF95B77504896A884F73D7EBB900641400E7CDFD56573E941E67EABC600B4C014C829802D400BCC9FA3A339B1C9A671005E35477200A0A551E8015591F93C8FC9E4D188018692429B0F930630070401B8A90663100021313E1C47900042A2B46C840600A580213681368726DEA008CEDAD8DD5A6181801460070801CE0068014602005A011ECA0069801C200718010C0302300AA2C02538007E2C01A100052AC00F210026AC0041492F4ADEFEF7337AAF2003AB360B23B3398F009005113B25FD004E5A32369C068C72B0C8AA804F0AE7E36519F6296D76509DE70D8C2801134F84015560034931C8044C7201F02A2A180258010D4D4E347D92AF6B35B93E6B9D7D0013B4C01D8611960E9803F0FA2145320043608C4284C4016CE802F2988D8725311B0D443700AA7A9A399EFD33CD5082484272BC9E67C984CF639A4D600BDE79EA462B5372871166AB33E001682557E5B74A0C49E25AACE76D074E7C5A6FD5CE697DC195C01993DCFC1D2A032BAA5C84C012B004C001098FD1FE2D00021B0821A45397350007F66F021291E8E4B89C118FE40180F802935CC12CD730492D5E2B180250F7401791B18CCFBBCD818007CB08A664C7373CEEF9FD05A73B98D7892402405802E000854788B91BC0010A861092124C2198023C0198880371222FC3E100662B45B8DB236C0F080172DD1C300820BCD1F4C24C8AAB0015F33D280'
bits = '9C0141080250320F1802104A08'
  .trim().split('').flatMap(function(char) { return parseInt(char, 16).toString(2).padStart(4, 0).split(''); }).join('');
var t = 0;
parse = function(start) {
    var _a, _b;
    var version = parseInt(bits.slice(start, start += 3), 2);
    t += version;
    var type = parseInt(bits.slice(start, start += 3), 2);
    if (type == 4) {
        var valueBit = '';
        while (true) {
            var hayMas = bits[start++] == '1';
            valueBit += bits.slice(start, start += 4);
            if (!hayMas)
                break;
        }
        var value = parseInt(valueBit, 2);
        return { start: start, value: value };
    } else {
        var v = void 0;
        var values = [];
        var lengthid = bits[start++];
        if (lengthid == '0') {
            var length_1 = parseInt(bits.slice(start, start += 15), 2);
            var end = start + length_1;
            while (start < end) {
                ;
                (_a = parse(start), start = _a.start, v = _a.value);
                values.push(v);
            }
        } else {
            var packetCount = parseInt(bits.slice(start, start += 11), 2);
            while (values.length < packetCount) {
                ;
                (_b = parse(start), start = _b.start, v = _b.value);
                values.push(v);
            }
        }
        var value = void 0;
        switch (type) {
            case 0: {
                value = values.reduce(function(a, b) { return a + b; }, 0);
                break;
            } // sum
            case 1: {
                value = values.reduce(function(a, b) { return a * b; }, 1);
                break;
            } // prod
            case 2: {
                value = Math.min.apply(Math, values);
                break;
            } // min
            case 3: {
                value = Math.max.apply(Math, values);
                break;
            } // max
            case 5: {
                value = +(values[0] > values[1]);
                break;
            } // gt
            case 6: {
                value = +(values[0] < values[1]);
                break;
            } // lt
            case 7: {
                value = +(values[0] == values[1]);
                break;
            } // =
        }
        return { start: start, value: value };
    }
};
console.log(parse(0));
