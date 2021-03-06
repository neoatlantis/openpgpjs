'use strict';

var openpgp = typeof window !== 'undefined' && window.openpgp ? window.openpgp : require('../../dist/openpgp');

var chai = require('chai'),
	expect = chai.expect;

describe('Key', function() {
  var twoKeys =
       ['-----BEGIN PGP PUBLIC KEY BLOCK-----',
        'Version: GnuPG v2.0.19 (GNU/Linux)',
        '',
        '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',
        'PepQmgsu',
        '=w6wd',
        '-----END PGP PUBLIC KEY BLOCK-----'].join("\n");

  var pub_revoked =
      ['-----BEGIN PGP PUBLIC KEY BLOCK-----',
      'Version: GnuPG v2.0.19 (GNU/Linux)',
      '',
      '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',
      'pMiJM+NJAQ==',
      '=ok+o',
      '-----END PGP PUBLIC KEY BLOCK-----'].join('\n');

  var pub_v3 =
      ['-----BEGIN PGP PUBLIC KEY BLOCK-----',
      'Version: SKS 1.1.3',
      '',
      'mQENAy9J/w4AAAEIALBDDD4vWqG/Jg59ghhMYAa+E7ECCTv2At8hxsM5cMP8P9sMLjs+GMfD',
      'IdQSOqlQXbunYADvM1l/h2fOuUMoYFIIGaUsO5Daxvd9uWceM4DVzhXMeJZb9wc5jEJEF21+',
      'qidKj5OGsMyTrg++mn4Gh/aFXvvy3N3KWaQpPfNi3NRZUpNLz0IlfbXVBQGD6reLoxPptJun',
      'NqpClyRiesgq8HCscmB2oQo+b9KzSSgzU9qQJA4SljMYVmJ2sDE/sjREI8iKL8lIgUMhJG9q',
      'NggWjuxFTpVcGKkuQFJIvdL+UhTVvEBuqw6n4cmFAzfZ/AInJM032qLtsaIf5begFKI3up0A',
      'BRGJARUDBSAxm7HC5begFKI3up0BAbdDB/0TOcI0ec+OPxC5RTZAltgIgyUc0yOjHoTD/yBh',
      'WjZdQ9YVrLGMWTW4fjhm4rFnppVZKS/N71bwI76SnN9zO4pPfx86aQPR7StmSLJxB+cfh2GL',
      'gudJoG9ifhJWdNYMUD/yhA0TpJkdHMD5yTDE5Ce/PqKLviiX9C5MPW0AT1MDvafQlzeUXfb5',
      '1a71vQNPw7W1NBAVZRwztm7TNUaxWMFuOmUtOJpq4F/qDQTIHW2zGPJvl47rpf6JSiyIyU70',
      'l0deiQcZOXPC80tgInhNoBrz3zbEXhXRJo1fHkr2YSLclpJaoUOHsPxoyrNB28ASL5ZknPwI',
      'Zx3+cFxaGpRprfSdtCFKb2huIEEuIFBlcnJ5IDxwZXJyeUBwaG9lbml4Lm5ldD6JARUDBRAv',
      'Sf8k5begFKI3up0BAcbGB/0eLod2qrQxoE2/RUWQtqklOPUj/p/ZTmvZm8BgsdIflb0AMeey',
      '9o8AbxyAgA3pcrcCjcye79M1Ma2trEvRksvs8hViuq3BXXjDbjPZi3wTtKSvbAC022OV52Sb',
      '8/sgiTGp7xC8QMqS8w4ZeKoxJGh1TVMYrevUA8a2Rr5aDqrR3EA4rifSHwkVjJWOPF69xiKt',
      'IVA0LcYJvGsPOQCf2ag+nOcnDrF4dvcmg6XZ/RyLepve+1qkhXsA/oq+yHoaqWfe+bwgssk/',
      'qw1aEUk7Di8x7vY+cfjvWaazcYGw8kkIwSSqqIq0pkKFz2xDDfSaDJl6OW/2GUK0wDpJmYZo',
      'PN40iJUDBRAvSgDsU5OkROGu2G8BAeUqBACbC45t4+wYxWCxxp81pkFRb8RWBvEvbXI+Spwd',
      '4NcKs8jc5OVC8V02yiq4KbKFDRxdw2OWpUCSRAJe1gjsfFrZ+2RivpKk06kbAYthES03MjXg',
      'cfcV3z2d7IWanJzdcOlzsHzPe1+RoUAaqBjvcqPRCGRlk0ogkYHyWYxElc6574iVAwUQL9iL',
      'CXr7ES8bepftAQGPywP/d9GSpEmS7LLIqazl4rgN1nkXN5KqduiH8Whu3xcBrdOAn7IYnGTp',
      'O+Ag4qwKKH+y/ke9CeZL6AnrU9c0pux150dHsDeHtpTPyInkjgKI7BofprydvpiFNd0nlAi4',
      'J4SAEYr3q92Qn/IiKpnLgo6Ls/GFb7q6y1O/2LL8PC2zrYU=',
      '=eoGb',
      '-----END PGP PUBLIC KEY BLOCK-----'].join('\n');

  var pub_sig_test =
   ['-----BEGIN PGP PUBLIC KEY BLOCK-----',
    'Version: GnuPG v2.0.19 (GNU/Linux)',
    '',
    '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',
    'yeSTTh8ZnzRiwuUH1t90E7w=',
    '=e8xo',
    '-----END PGP PUBLIC KEY BLOCK-----'].join('\n');

  var priv_key_rsa =
    ['-----BEGIN PGP PRIVATE KEY BLOCK-----',
    'Version: GnuPG v2.0.19 (GNU/Linux)',
    '',
    'lQH+BFJhL04BBADclrUEDDsm0PSZbQ6pml9FpzTyXiyCyDN+rMOsy9J300Oc10kt',
    '/nyBej9vZSRcaW5VpNNj0iA+c1/w2FPf84zNsTzvDmuMaNHFUzky4/vkYuZra//3',
    '+Ri7CF8RawSYQ/4IRbC9zqdBlzniyfQOW7Dp/LYe8eibnDSrmkQem0G0jwARAQAB',
    '/gMDAu7L//czBpE40p1ZqO8K3k7UejemjsQqc7kOqnlDYd1Z6/3NEA/UM30Siipr',
    'KjdIFY5+hp0hcs6EiiNq0PDfm/W2j+7HfrZ5kpeQVxDek4irezYZrl7JS2xezaLv',
    'k0Fv/6fxasnFtjOM6Qbstu67s5Gpl9y06ZxbP3VpT62+Xeibn/swWrfiJjuGEEhM',
    'bgnsMpHtzAz/L8y6KSzViG/05hBaqrvk3/GeEA6nE+o0+0a6r0LYLTemmq6FbaA1',
    'PHo+x7k7oFcBFUUeSzgx78GckuPwqr2mNfeF+IuSRnrlpZl3kcbHASPAOfEkyMXS',
    'sWGE7grCAjbyQyM3OEXTSyqnehvGS/1RdB6kDDxGwgE/QFbwNyEh6K4eaaAThW2j',
    'IEEI0WEnRkPi9fXyxhFsCLSI1XhqTaq7iDNqJTxE+AX2b9ZuZXAxI3Tc/7++vEyL',
    '3p18N/MB2kt1Wb1azmXWL2EKlT1BZ5yDaJuBQ8BhphM3tCRUZXN0IE1jVGVzdGlu',
    'Z3RvbiA8dGVzdEBleGFtcGxlLmNvbT6IuQQTAQIAIwUCUmEvTgIbLwcLCQgHAwIB',
    'BhUIAgkKCwQWAgMBAh4BAheAAAoJEEpjYTpNbkCUMAwD+gIK08qpEZSVas9qW+Ok',
    '32wzNkwxe6PQgZwcyBqMQYZUcKagC8+89pMQQ5sKUGvpIgat42Tf1KLGPcvG4cDA',
    'JZ6w2PYz9YHQqPh9LA+PAnV8m25TcGmKcKgvFUqQ3U53X/Y9sBP8HooRqfwwHcv9',
    'pMgQmojmNbI4VHydRqIBePawnQH+BFJhL04BBADpH8+0EVolpPiOrXTKoBKTiyrB',
    'UyxzodyJ8zmVJ3HMTEU/vidpQwzISwoc/ndDFMXQauq6xqBCD9m2BPQI3UdQzXnb',
    'LsAI52nWCIqOkzM5NAKWoKhyXK9Y4UH4v9LAYQgl/stIISvCgG4mJ8lzzEBWvRdf',
    'Qm2Ghb64/3V5NDdemwARAQAB/gMDAu7L//czBpE40iPcpLzL7GwBbWFhSWgSLy53',
    'Md99Kxw3cApWCok2E8R9/4VS0490xKZIa5y2I/K8thVhqk96Z8Kbt7MRMC1WLHgC',
    'qJvkeQCI6PrFM0PUIPLHAQtDJYKtaLXxYuexcAdKzZj3FHdtLNWCooK6n3vJlL1c',
    'WjZcHJ1PH7USlj1jup4XfxsbziuysRUSyXkjn92GZLm+64vCIiwhqAYoizF2NHHG',
    'hRTN4gQzxrxgkeVchl+ag7DkQUDANIIVI+A63JeLJgWJiH1fbYlwESByHW+zBFNt',
    'qStjfIOhjrfNIc3RvsggbDdWQLcbxmLZj4sB0ydPSgRKoaUdRHJY0S4vp9ouKOtl',
    '2au/P1BP3bhD0fDXl91oeheYth+MSmsJFDg/vZJzCJhFaQ9dp+2EnjN5auNCNbaI',
    'beFJRHFf9cha8p3hh+AK54NRCT++B2MXYf+TPwqX88jYMBv8kk8vYUgo8128r1zQ',
    'EzjviQE9BBgBAgAJBQJSYS9OAhsuAKgJEEpjYTpNbkCUnSAEGQECAAYFAlJhL04A',
    'CgkQ4IT3RGwgLJe6ogQA2aaJEIBIXtgrs+8WSJ4k3DN4rRXcXaUZf667pjdD9nF2',
    '3BzjFH6Z78JIGaxRHJdM7b05aE8YuzM8f3NIlT0F0OLq/TI2muYU9f/U2DQBuf+w',
    'KTB62+PELVgi9MsXC1Qv/u/o1LZtmmxTFFOD35xKsxZZI2OJj2pQpqObW27M8Nlc',
    'BQQAw2YA3fFc38qPK+PY4rZyTRdbvjyyX+1zeqIo8wn7QCQwXs+OGaH2fGoT35AI',
    'SXuqKcWqoEuO7OBSEFThCXBfUYMC01OrqKEswPm/V3zZkLu01q12UMwZach28QwK',
    '/YZly4ioND2tdazj17u2rU2dwtiHPe1iMqGgVMoQirfLc+k=',
    '=lw5e',
    '-----END PGP PRIVATE KEY BLOCK-----'].join('\n');

  var user_attr_key =
    ['-----BEGIN PGP PUBLIC KEY BLOCK-----',
    'Version: GnuPG v2.0.22 (GNU/Linux)',
    '',
    'mI0EUmEvTgEEANyWtQQMOybQ9JltDqmaX0WnNPJeLILIM36sw6zL0nfTQ5zXSS3+',
    'fIF6P29lJFxpblWk02PSID5zX/DYU9/zjM2xPO8Oa4xo0cVTOTLj++Ri5mtr//f5',
    'GLsIXxFrBJhD/ghFsL3Op0GXOeLJ9A5bsOn8th7x6JucNKuaRB6bQbSPABEBAAG0',
    'JFRlc3QgTWNUZXN0aW5ndG9uIDx0ZXN0QGV4YW1wbGUuY29tPoi5BBMBAgAjBQJS',
    'YS9OAhsvBwsJCAcDAgEGFQgCCQoLBBYCAwECHgECF4AACgkQSmNhOk1uQJQwDAP6',
    'AgrTyqkRlJVqz2pb46TfbDM2TDF7o9CBnBzIGoxBhlRwpqALz7z2kxBDmwpQa+ki',
    'Bq3jZN/UosY9y8bhwMAlnrDY9jP1gdCo+H0sD48CdXybblNwaYpwqC8VSpDdTndf',
    '9j2wE/weihGp/DAdy/2kyBCaiOY1sjhUfJ1GogF49rDRwc7BzAEQAAEBAAAAAAAA',
    'AAAAAAAA/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQN',
    'DAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/',
    '2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIy',
    'MjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAAFABQDASIAAhEBAxEB/8QAHwAAAQUB',
    'AQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQID',
    'AAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0',
    'NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKT',
    'lJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl',
    '5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL',
    '/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHB',
    'CSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpj',
    'ZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3',
    'uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIR',
    'AxEAPwD3+iiigAooooA//9mIuQQTAQIAIwUCUzxDqQIbLwcLCQgHAwIBBhUIAgkK',
    'CwQWAgMBAh4BAheAAAoJEEpjYTpNbkCU9PEEAKMMaXjhGdgDISBXAAEVXL6MB3x1',
    'd/7zBdnUljh1gM34TSKvbeZf7h/1DNgLbJFfSF3KiLViiqRVOumIkjwNIMZPqYtu',
    'WoEcElY50mvTETzOKemCt1GYI0GhOY2uZOVRtQLrkX0CB9r5hEQalkrnjNKlbghj',
    'LfOYu1uARF16cZUWuI0EUmEvTgEEAOkfz7QRWiWk+I6tdMqgEpOLKsFTLHOh3Inz',
    'OZUnccxMRT++J2lDDMhLChz+d0MUxdBq6rrGoEIP2bYE9AjdR1DNedsuwAjnadYI',
    'io6TMzk0ApagqHJcr1jhQfi/0sBhCCX+y0ghK8KAbiYnyXPMQFa9F19CbYaFvrj/',
    'dXk0N16bABEBAAGJAT0EGAECAAkFAlJhL04CGy4AqAkQSmNhOk1uQJSdIAQZAQIA',
    'BgUCUmEvTgAKCRDghPdEbCAsl7qiBADZpokQgEhe2Cuz7xZIniTcM3itFdxdpRl/',
    'rrumN0P2cXbcHOMUfpnvwkgZrFEcl0ztvTloTxi7Mzx/c0iVPQXQ4ur9Mjaa5hT1',
    '/9TYNAG5/7ApMHrb48QtWCL0yxcLVC/+7+jUtm2abFMUU4PfnEqzFlkjY4mPalCm',
    'o5tbbszw2VwFBADDZgDd8Vzfyo8r49jitnJNF1u+PLJf7XN6oijzCftAJDBez44Z',
    'ofZ8ahPfkAhJe6opxaqgS47s4FIQVOEJcF9RgwLTU6uooSzA+b9XfNmQu7TWrXZQ',
    'zBlpyHbxDAr9hmXLiKg0Pa11rOPXu7atTZ3C2Ic97WIyoaBUyhCKt8tz6Q==',
    '=MVfN',
    '-----END PGP PUBLIC KEY BLOCK-----'].join('\n');

var pgp_desktop_pub =
    ['-----BEGIN PGP PUBLIC KEY BLOCK-----',
    'Version: Encryption Desktop 10.3.0 (Build 9307)',
    '',
    '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',
    '=dVeR',
    '-----END PGP PUBLIC KEY BLOCK-----'].join('\n');

var pgp_desktop_priv =
    ['-----BEGIN PGP PRIVATE KEY BLOCK-----',
    'Version: Encryption Desktop 10.3.0 (Build 9307)',
    '',
    'lQPGBFNjoowBCACeKvpQnv8wN3UdDVrZN//Bh/Dtq60hbZ3ObfTbNVBQ0DLD6jWA',
    'lKgwgSa3GLr0a3qrc30CRq0hRIjrFMrg4aPu5sRiZYP90B1cUGf08F2by8f+as2b',
    'BOBzRkcxH/ZmBZPU0pkRoOnkMvoT+YVt2MxzaJRBKM1dgcPXTHvZ52j7V0uEJvs8',
    's/H8DJq6MtgYqoS1zt/+eqUSDCcsVJBsEl7o7qU2d9i074hiBouM2B2mimvBKFIn',
    'W2kmG6fSryNSLaUMwvOTEC/esVNlgvSBfhu82Gic8Rwc+g0cHUnAESChxz/jE0P6',
    'INt2IpBZKeuXCY97tQmce3R4GOc/r3FNBBa3ABEBAAH+CQMCnq0oXlNfXhuothLb',
    '7AD3fAc7cpnuondcU2+OdOmnkrB73Qf7iVztLXRcMdIZloSqTlAna8w2ZhmDAdId',
    'EkEO0Uj+Gf7jjC7bLPob/fOj1TMZB3EPX8xs4DhD2oBI5hPNcFrZdHY+qUh1MvMm',
    'zdKgBsnbU6nJK4MrhrJ7InPIopqbNcw3ILrJZkD7U6fhiROx0+7CQ9DSVEscTj/K',
    'u3FeGchNwY2ZmTEDrXy2ZGcQRSuw04GPUcXsBqgD3vivhJtq88K5a4SFPx28uaDO',
    'VXvbUhQ6BpfMaAvpjfJZHzelU4LyQQP+cR/lmR+E7CNuxGa4sT6+NgJ4mQjdWNTc',
    'XBaFUU8DgrOX2pAjYgszbETlATK1LRVM2eV/bXBURpEY8DL+OtwE1eAb/m4dAJXE',
    'cFx8CyaZfI64m27X6av/9GTATXVLHuQUbQHiqhxpaOJSj3ykUvfnQGQedKkT6m7/',
    'Od1B1dQuO0NwRQaM9SOfpNoM9pLU4z2cyOJJBtNydigTyqH7S9WK77BMrsWyHNCG',
    'yXo8qrCLv8oBGLM8m0WfT8twF/VyFo3iVUHIkzy7NbDu9QqiXnGzg7aBeo1L8mwk',
    'Fa5vI44Y1kI2XyjPtpOWtxHaq0YGCtSXuQtr3fSQW/AxQzqJW6lzTjdVSCXXxY/G',
    '2DHWbRbbB2bdk1ehJUzSYHRMvgdsvFkZrdLy5Ibz5bTR80RRHn2Z8vYr/bSTOXdF',
    'Xo2F5CvhTME+1BJRhObgqJax8vRnArhu+JVml2cjigHnpH05WzEWv7ezqwsQlUz9',
    'EUN0dZ8Bg4UH7khdcl1Xcepb3+kzFFrGAQG02n1HhZ1Lc1pUTzHKrIQ57x4LUuP8',
    'ZOrysjcAC9TdqySvWEilEGsn/mu6/tnmZNaViDWlzah6mRgaz3Z+m2NkfcJbn/ZH',
    'VHWfOZEku5mNtB1QR1AgRGVza3RvcCAxMC4zIDxwZ3BAc3ltLmRlPp0DxgRTY6KN',
    'AQgA6tnPjznr7HHcoEFXNRC+LEkDOLAm5kTU9MY+2joJyHG7XmEAhPRt4Cp5Fq79',
    'sXPvGZ6tQnD8NVvqc3+91ThTLLKCIRdLOunIGIEJdCr7gN49kgDYisWxt7QQIsv7',
    'Q0SqbGJa7F/jPj5EDf36XJlACJy1yfP6KI6NunffLa23BUU0t0S/TWqq4185nQcz',
    'J1JnZItyyBIyIWXrNtz56B/mIDvIU56SxxpsrcYctAT68vW0njyQ7XRNIzsmvn4o',
    '+H9YHnSz3VdXeJaXd7TdU+WLT2lbgzF5BvDN3AlJI8jiONfu0rW9oBmHsQdjDcOl',
    'WdExsCx5Lz7+La7EK/mX0rUVeQARAQAB/gkDAm8zCrvNFCfycCMEudU+3gQFw9Vw',
    'YP5SEAiCwegbNw/RsPXxIy6nzFbKMP9qN8SApFwhuz9qf6SeeSafNtXLDz1dZEQd',
    'yYF4BQ0GLZpeE0kF6XvdefVpTiYJaSc2Px+Ae+fw+s+jF/STvLMI8xjWBmUugs/o',
    'Xto58R6ILKC7n4Fl0YrZcB2hRyIkFu2fq9KhcdAj15rXxxL0Fpzn4wwynCGQW+EO',
    'Ix3QfDmuFweoHrU15Q7ItmpFlX+QfvTzL7uBS8WUwx2Fd/LkbA7K7yivCBDy6LxB',
    'rPnffE1EibAVdOHKIkIaSw+zBAOnkieaJou/BEH/NUerAk1uvzZZwi3tKoYy8rxU',
    'EGPcyblYyBHYRKgGwLsjN1VFvnutBDq7f1uRo5ElCSiVfMsST9VNHIft4V0l6Lsb',
    'VK/2U5+gT6GUeSXW9Rm4fSZwyslSeB2d0Cq6gbkEUAsIaI8JDtnkBPf/boHb0/S7',
    'yFeode6LIUrGqrc9ti4Zky+QFsGchJtc191pNsuvYXgeocEz2UjEBra+Tf/Z6Ysv',
    'zMU8+fVeubWvRpSDhlLc8/+z9FD0hqKJzuJUT5sLfBIvPOkpjDP9k48k5wABzW6S',
    'Mevw/X2M2vGRdHit/Pzn25Ei1H5O4dUMUkneym0qZxQmi8l/4cl8Yr1yYOKk+dsk',
    '1dOOGYnyNkoPtrIjLSzctkWZPhVjM7thasBeI77eVdAP4qhf4lCTcnqvnO6eNFLw',
    'ZylzWyYPZrHGIut6Ltasvz2syeAGEDG2RBLNO+z8Mw4RM9jWmNGESiA8RjcBbSfa',
    'l5iBJgRBfVwB9v3/3Jh6V5BA1t9LY1nGbodpM6xQVQRHpzMYYO241bB+dtbW3a3y',
    'XvVs3DJafcAgdGv/TF39h1OP518mNzDG9tYYeAMbJrjby/L0OfS0lEC1gE2Nh1va',
    '5g==',
    '=63Nq',
    '-----END PGP PRIVATE KEY BLOCK-----'].join('\n');

  it('Parsing armored text with two keys', function(done) {
    var pubKeys = openpgp.key.readArmored(twoKeys);
    expect(pubKeys).to.exist;
    expect(pubKeys.err).to.not.exist;
    expect(pubKeys.keys).to.have.length(2);
    expect(pubKeys.keys[0].primaryKey.getKeyId().toHex()).to.equal('4a63613a4d6e4094');
    expect(pubKeys.keys[1].primaryKey.getKeyId().toHex()).to.equal('dbf223e870534df4');
    done();
  });

  it('Testing key ID and fingerprint for V3 and V4 keys', function(done) {
    var pubKeysV4 = openpgp.key.readArmored(twoKeys);
    expect(pubKeysV4).to.exist;
    expect(pubKeysV4.err).to.not.exist;
    expect(pubKeysV4.keys).to.have.length(2);

    var pubKeyV4 = pubKeysV4.keys[0];
    expect(pubKeyV4).to.exist;

    var pubKeysV3 = openpgp.key.readArmored(pub_v3);

    expect(pubKeysV3).to.exist;
    expect(pubKeysV3.err).to.not.exist;
    expect(pubKeysV3.keys).to.have.length(1);

    var pubKeyV3 = pubKeysV3.keys[0];
    expect(pubKeyV3).to.exist;

    expect(pubKeyV4.primaryKey.getKeyId().toHex()).to.equal('4a63613a4d6e4094');
    expect(pubKeyV4.primaryKey.getFingerprint()).to.equal('f470e50dcb1ad5f1e64e08644a63613a4d6e4094');
    expect(pubKeyV3.primaryKey.getKeyId().toHex()).to.equal('e5b7a014a237ba9d');
    expect(pubKeyV3.primaryKey.getFingerprint()).to.equal('a44fcee620436a443bc4913640ab3e49');
    done();
  });

  it('Create new key ID with fromId()', function() {
    var pubKeyV4 = openpgp.key.readArmored(twoKeys).keys[0];
    var keyId = pubKeyV4.primaryKey.getKeyId();
    var newKeyId = keyId.constructor.fromId(keyId.toHex());
    expect(newKeyId.toHex()).to.equal(keyId.toHex());
  });

  it('Testing key method getSubkeyPackets', function(done) {
    var pubKeys = openpgp.key.readArmored(pub_sig_test);

    expect(pubKeys).to.exist;
    expect(pubKeys.err).to.not.exist;
    expect(pubKeys.keys).to.have.length(1);

    var pubKey = pubKeys.keys[0];
    expect(pubKey).to.exist;

    var packetlist = new openpgp.packet.List();

    packetlist.read(openpgp.armor.decode(pub_sig_test).data);

    var subkeys = pubKey.getSubkeyPackets();
    expect(subkeys).to.exist;
    expect(subkeys).to.have.length(2);
    expect(subkeys[0].getKeyId().equals(packetlist[8].getKeyId())).to.be.true;
    expect(subkeys[1].getKeyId().equals(packetlist[11].getKeyId())).to.be.true;
    done();
  });

  it('Verify status of revoked subkey', function(done) {
    var pubKeys = openpgp.key.readArmored(pub_sig_test);
    expect(pubKeys).to.exist;
    expect(pubKeys.err).to.not.exist;
    expect(pubKeys.keys).to.have.length(1);

    var pubKey = pubKeys.keys[0];
    expect(pubKey).to.exist;
    expect(pubKey.subKeys).to.exist;
    expect(pubKey.subKeys).to.have.length(2);

    var status = pubKey.subKeys[0].verify(pubKey.primaryKey);
    expect(status).to.equal(openpgp.enums.keyStatus.revoked);
    done();
  });

  it('Evaluate key flags to find valid encryption key packet', function() {
    var pubKeys = openpgp.key.readArmored(pub_sig_test);
    expect(pubKeys).to.exist;
    expect(pubKeys.err).to.not.exist;
    expect(pubKeys.keys).to.have.length(1);

    var pubKey = pubKeys.keys[0];
    // remove subkeys
    pubKey.subKeys = null;
    // primary key has only key flags for signing
    var keyPacket = pubKey.getEncryptionKeyPacket();
    expect(keyPacket).to.not.exist;
  });

  it('Method getExpirationTime V4 Key', function() {
    var pubKey = openpgp.key.readArmored(twoKeys).keys[1];
    expect(pubKey).to.exist;
    expect(pubKey).to.be.an.instanceof(openpgp.key.Key);
    expect(pubKey.getExpirationTime().toISOString()).to.be.equal('2018-11-26T10:58:29.000Z');
  });

  it('Method getExpirationTime V4 SubKey', function() {
    var pubKey = openpgp.key.readArmored(twoKeys).keys[1];
    expect(pubKey).to.exist;
    expect(pubKey).to.be.an.instanceof(openpgp.key.Key);
    expect(pubKey.subKeys[0].getExpirationTime().toISOString()).to.be.equal('2018-11-26T10:58:29.000Z');
  });

  it('update() - throw error if fingerprints not equal', function() {
    var keys = openpgp.key.readArmored(twoKeys).keys;
    expect(keys[0].update.bind(keys[0], keys[1])).to.throw('Key update method: fingerprints of keys not equal');
  });

  it('update() - merge revocation signature', function() {
    var source = openpgp.key.readArmored(pub_revoked).keys[0];
    var dest = openpgp.key.readArmored(pub_revoked).keys[0];
    expect(source.revocationSignature).to.exist;
    dest.revocationSignature = null;
    dest.update(source);
    expect(dest.revocationSignature).to.exist.and.be.an.instanceof(openpgp.packet.Signature);
  });

  it('update() - merge user', function() {
    var source = openpgp.key.readArmored(pub_sig_test).keys[0];
    var dest = openpgp.key.readArmored(pub_sig_test).keys[0];
    expect(source.users[1]).to.exist;
    dest.users.pop();
    dest.update(source);
    expect(dest.users[1]).to.exist;
    expect(dest.users[1].userId).to.equal(source.users[1].userId);
  });

  it('update() - merge user - other and revocation certification', function() {
    var source = openpgp.key.readArmored(pub_sig_test).keys[0];
    var dest = openpgp.key.readArmored(pub_sig_test).keys[0];
    expect(source.users[1].otherCertifications).to.exist;
    expect(source.users[1].revocationCertifications).to.exist;
    dest.users[1].otherCertifications = null;
    dest.users[1].revocationCertifications.pop();
    dest.update(source);
    expect(dest.users[1].otherCertifications).to.exist.and.to.have.length(1);
    expect(dest.users[1].otherCertifications[0].signature).to.equal(source.users[1].otherCertifications[0].signature);
    expect(dest.users[1].revocationCertifications).to.exist.and.to.have.length(2);
    expect(dest.users[1].revocationCertifications[1].signature).to.equal(source.users[1].revocationCertifications[1].signature);
  });

  it('update() - merge subkey', function() {
    var source = openpgp.key.readArmored(pub_sig_test).keys[0];
    var dest = openpgp.key.readArmored(pub_sig_test).keys[0];
    expect(source.subKeys[1]).to.exist;
    dest.subKeys.pop();
    dest.update(source);
    expect(dest.subKeys[1]).to.exist;
    expect(dest.subKeys[1].subKey.getKeyId().toHex()).to.equal(source.subKeys[1].subKey.getKeyId().toHex());
  });

  it('update() - merge subkey - revocation signature', function() {
    var source = openpgp.key.readArmored(pub_sig_test).keys[0];
    var dest = openpgp.key.readArmored(pub_sig_test).keys[0];
    expect(source.subKeys[0].revocationSignature).to.exist;
    dest.subKeys[0].revocationSignature = null;
    dest.update(source);
    expect(dest.subKeys[0].revocationSignature).to.exist;
    expect(dest.subKeys[0].revocationSignature.signature).to.equal(dest.subKeys[0].revocationSignature.signature);
  });

  it('update() - merge private key into public key', function() {
    var source = openpgp.key.readArmored(priv_key_rsa).keys[0];
    var dest = openpgp.key.readArmored(twoKeys).keys[0];
    expect(dest.isPublic()).to.be.true;
    dest.update(source);
    expect(dest.isPrivate()).to.be.true;
    expect(source.verifyPrimaryKey()).to.equal(dest.verifyPrimaryKey());
    expect(source.users[0].verify(source.primaryKey)).to.equal(dest.users[0].verify(dest.primaryKey));
    expect(source.subKeys[0].verify(source.primaryKey)).to.equal(dest.subKeys[0].verify(dest.primaryKey));
  });

  it('update() - merge private key into public key - no subkeys', function() {
    var source = openpgp.key.readArmored(priv_key_rsa).keys[0];
    var dest = openpgp.key.readArmored(twoKeys).keys[0];
    source.subKeys = null;
    dest.subKeys = null;
    expect(dest.isPublic()).to.be.true;
    dest.update(source);
    expect(dest.isPrivate()).to.be.true;
    expect(source.verifyPrimaryKey()).to.equal(dest.verifyPrimaryKey());
    expect(source.users[0].verify(source.primaryKey)).to.equal(dest.users[0].verify(dest.primaryKey));
  });

  it('update() - merge private key into public key - mismatch throws error', function() {
    var source = openpgp.key.readArmored(priv_key_rsa).keys[0];
    var dest = openpgp.key.readArmored(twoKeys).keys[0];
    source.subKeys = null;
    expect(dest.subKeys).to.exist;
    expect(dest.isPublic()).to.be.true;
    expect(dest.update.bind(dest, source)).to.throw('Cannot update public key with private key if subkey mismatch');
  });

  it('update() - merge subkey binding signatures', function() {
    var source = openpgp.key.readArmored(pgp_desktop_pub).keys[0];
    var dest = openpgp.key.readArmored(pgp_desktop_priv).keys[0];
    expect(source.subKeys[0].bindingSignature).to.exist;
    expect(source.subKeys[0].verify(source.primaryKey)).to.equal(openpgp.enums.keyStatus.valid);
    expect(dest.subKeys[0].bindingSignature).to.not.exist;
    dest.update(source);
    expect(dest.subKeys[0].bindingSignature).to.exist;
    expect(dest.subKeys[0].verify(source.primaryKey)).to.equal(openpgp.enums.keyStatus.valid);
  });

  it('getPreferredSymAlgo() - one key - AES256', function() {
    var key1 = openpgp.key.readArmored(twoKeys).keys[0];
    var prefAlgo = openpgp.key.getPreferredSymAlgo([key1]);
    expect(prefAlgo).to.equal(openpgp.enums.symmetric.aes256);
  });

  it('getPreferredSymAlgo() - two key - AES128', function() {
    var keys = openpgp.key.readArmored(twoKeys).keys;
    var key1 = keys[0];
    var key2 = keys[1];
    key2.getPrimaryUser().selfCertificate.preferredSymmetricAlgorithms = [6,7,3];
    var prefAlgo = openpgp.key.getPreferredSymAlgo([key1, key2]);
    expect(prefAlgo).to.equal(openpgp.enums.symmetric.aes128);
  });

  it('getPreferredSymAlgo() - two key - one without pref', function() {
    var keys = openpgp.key.readArmored(twoKeys).keys;
    var key1 = keys[0];
    var key2 = keys[1];
    key2.getPrimaryUser().selfCertificate.preferredSymmetricAlgorithms = null;
    var prefAlgo = openpgp.key.getPreferredSymAlgo([key1, key2]);
    expect(prefAlgo).to.equal(openpgp.config.encryption_cipher);
  });

  it('Preferences of generated key', function(done) {
    var testPref = function(key) {
      // key flags
      var keyFlags = openpgp.enums.keyFlags;
      expect(key.users[0].selfCertifications[0].keyFlags[0] & keyFlags.certify_keys).to.equal(keyFlags.certify_keys);
      expect(key.users[0].selfCertifications[0].keyFlags[0] & keyFlags.sign_data).to.equal(keyFlags.sign_data);
      expect(key.subKeys[0].bindingSignature.keyFlags[0] & keyFlags.encrypt_communication).to.equal(keyFlags.encrypt_communication);
      expect(key.subKeys[0].bindingSignature.keyFlags[0] & keyFlags.encrypt_storage).to.equal(keyFlags.encrypt_storage);
      var sym = openpgp.enums.symmetric;
      expect(key.users[0].selfCertifications[0].preferredSymmetricAlgorithms).to.eql([sym.aes256, sym.aes128, sym.aes192, sym.cast5, sym.tripledes]);
      var hash = openpgp.enums.hash;
      expect(key.users[0].selfCertifications[0].preferredHashAlgorithms).to.eql([hash.sha256, hash.sha1, hash.sha512]);
      var compr = openpgp.enums.compression;
      expect(key.users[0].selfCertifications[0].preferredCompressionAlgorithms).to.eql([compr.zlib, compr.zip]);
      expect(key.users[0].selfCertifications[0].features).to.eql(openpgp.config.integrity_protect ? [1] : null); // modification detection
    };
    var opt = {numBits: 512, userIds: 'test <a@b.com>', passphrase: 'hello'};
    if (openpgp.util.getWebCryptoAll()) { opt.numBits = 2048; } // webkit webcrypto accepts minimum 2048 bit keys
    openpgp.generateKey(opt).then(function(key) {
      testPref(key.key);
      testPref(openpgp.key.readArmored(key.publicKeyArmored).keys[0]);
      done();
    });
  });

  it('User attribute packet read & write', function() {
    var key = openpgp.key.readArmored(user_attr_key).keys[0];
    var key2 = openpgp.key.readArmored(key.armor()).keys[0];
    expect(key.users[1].userAttribute).eql(key2.users[1].userAttribute);
  });

  it('getPrimaryUser()', function() {
    var key = openpgp.key.readArmored(pub_sig_test).keys[0];
    var primUser = key.getPrimaryUser();
    expect(primUser).to.exist;
    expect(primUser.user.userId.userid).to.equal('Signature Test <signature@test.com>');
    expect(primUser.selfCertificate).to.be.an.instanceof(openpgp.packet.Signature);
  });

  it('Generated key is not unlocked by default', function(done) {
    var opt = {numBits: 512, userIds: 'test <a@b.com>', passphrase: '123'};
    if (openpgp.util.getWebCryptoAll()) { opt.numBits = 2048; } // webkit webcrypto accepts minimum 2048 bit keys
    var key;
    openpgp.generateKey(opt).then(function(newKey) {
      key = newKey;
      return openpgp.message.fromText('hello').encrypt([key.key]);
    }).then(function(msg) {
      return msg.decrypt(key.key);
    }).catch(function(err) {
      expect(err.message).to.equal('Private key is not decrypted.');
      done();
    });
  });

  it('Generate key - single userid', function(done) {
    var userId = 'test <a@b.com>';
    var opt = {numBits: 512, userIds: userId, passphrase: '123'};
    if (openpgp.util.getWebCryptoAll()) { opt.numBits = 2048; } // webkit webcrypto accepts minimum 2048 bit keys
    openpgp.generateKey(opt).then(function(key) {
      key = key.key;
      expect(key.users.length).to.equal(1);
      expect(key.users[0].userId.userid).to.equal(userId);
      done();
    }).catch(done);
  });

  it('Generate key - multi userid', function(done) {
    var userId1 = 'test <a@b.com>';
    var userId2 = 'test <b@c.com>';
    var opt = {numBits: 512, userIds: [userId1, userId2], passphrase: '123'};
    if (openpgp.util.getWebCryptoAll()) { opt.numBits = 2048; } // webkit webcrypto accepts minimum 2048 bit keys
    openpgp.generateKey(opt).then(function(key) {
      key = key.key;
      expect(key.users.length).to.equal(2);
      expect(key.users[0].userId.userid).to.equal(userId1);
      expect(key.users[0].selfCertifications[0].isPrimaryUserID).to.be.true;
      expect(key.users[1].userId.userid).to.equal(userId2);
      expect(key.users[1].selfCertifications[0].isPrimaryUserID).to.be.null;
      done();
    }).catch(done);
  });

  it('Encrypt key with new passphrase', function(done) {
    var userId = 'test <a@b.com>';
    var opt = {numBits: 512, userIds: userId, passphrase: 'passphrase'};
    if (openpgp.util.getWebCryptoAll()) { opt.numBits = 2048; } // webkit webcrypto accepts minimum 2048 bit keys
    openpgp.generateKey(opt).then(function(key) {
      key = key.key;
      var armor1 = key.armor();
      var armor2 = key.armor();
      expect(armor1).to.equal(armor2);
      expect(key.decrypt('passphrase')).to.be.true;
      expect(key.primaryKey.isDecrypted).to.be.true;
      key.encrypt('new_passphrase');
      expect(key.primaryKey.isDecrypted).to.be.false;
      expect(key.decrypt('passphrase')).to.be.false;
      expect(key.primaryKey.isDecrypted).to.be.false;
      expect(key.decrypt('new_passphrase')).to.be.true;
      expect(key.primaryKey.isDecrypted).to.be.true;
      var armor3 = key.armor();
      expect(armor3).to.not.equal(armor1);
      done();
    }).catch(done);
  });

});

