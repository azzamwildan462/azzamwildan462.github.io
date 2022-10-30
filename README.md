# Tugas Asistensiku

## Global

1. Sholat 5 waktu
2. Istirahat kalo capek
3. Gk bisa ngerjain berarti anak ITB, kalo bisa ngerjain baru bisa dibilang anak ITS
4. Semua soal-soal yang saya berikan adalah soal-soal yang penyelesainnya memang benar-benar digunakan di dunia pekerjaan.

## IO + Aritmatika

1. Diberikan beberapa buah user input yang menyatakan titik awal (x,y), titik target (x,y), dan minimal iterasi untuk mendekati titik tersebut. Carilah berapa besar kecepatan_x dan kecepatan_y nya untuk mendekati target dengan minimal iterasi yang diberikan. Urutan input adalah x y awal lalu x y target lalu minimal iterasi. Contoh input `0 0 10 10 3` maka vel_x = 3 dan vel_y = 3. Contoh lagi ketika input `6 9 69 6969 10` maka vel_x = 6 dan vel_y = 696.
2. Bagaimana cara membuat user input menjadi double? (asdasd) atau Triple? (asdasdasd) atau Quadruple? (asdasdasdasd) (Konstruksi string) Bagaimana cara print dengan normal? Bagaimana cara print dengan indikasi error? (Ketika kita run program tanpa error message maka print tadi tidak akan ter-print)
3. Ada 4 data yang bisa bernilai 0 atau 1, bagaimana cara menggabungkan 4 data tersebut kedalam satu variabel? (1 byte integer)
4. Ada 6 data yang bisa bernilai `0 <= x <= 5`, bagaimana cara menggabungkan data tersebut menjadi sebuah 2 bytes integer?
5. User input berupa 2 titik sampel sebuah bola, Dimanakah titik prediksi bola tersebut pada saat bola_y=0 ? (urutan input adalah x0 y0 x1 y1)

## Percabangan

1. Diberikan input sebuah angka, print 'Angka Ganjil' ketika angka inputan ganjil, dan print 'Angka Genap' ketika angka tersebut genap
2. Diberikan sebuah State Machine yang nilainya berdasarkan input user, print 'Program init' ketika inputnya 0, print 'Calibration' ketika inputnya 1, print 'Positioning' ketika inputnya 10, print 'Routine state' ketika inputnya 100, dan print 'False state' ketika inputnya selain angka-angka diatas

## Perulangan

1. Buat sebuah perulangan yang nge-print '0 100 200 44 144 244 88 188 32 132 232 76 ' tanpa pake `if statement` atau percabangan lainnya   
2. Convert sebuah unsigned int 8 bit angka menjadi bentuk binarynya dengan tambahan custom berapa bit untuk ditampilkan (maksimal 8 bit). Input ada 2 berupa angka (0 sampai 255) dan berapa banyak bit (1 sampai 8). Contoh `16 6` maka akan jadi `010000`. Contoh `123 4` maka akan jadi `1011`.   
3. Saya punya robot dengan posisi awal (69,69) buatlah sebuah infinity loop untuk membuatnya bergerak mendekati titik target yang berupa input user. Program berhenti ketika input user == input sebelumnya. **Fungsi yang boleh digunakan adalah scanf, printf, dan fflush dari library stdio.h dan sqrt dari library math.h**. Program hanya ada di dalam while(1). Saya beri clue untuk menggunakan `static variable`

```
int main(){
    while(1){
        // Program disini
    }
    return 0;
}
```

Contoh program saat dijalankan https://youtu.be/KK2eWDpX10Y

## Array dan Fungsi

1. Bagaimana cara membuat sebuah fungsi dengan hanya satu parameter tapi bisa menerima 4 flag, contohnya jika saya masukkan flag1 dan flag3 maka fungsi tersebut bisa tahu bahwa saya memanggilnya dengan menggunakan flag1 dan flag3. Saya beri clue gunakan logika bits. Value masing-masing flag

```
FLAG_1 0x02
FLAG_2 0x04
FLAG_3 0x08
FLAG_4 0x10
```

2. Diberikan sebuah variabel char array dengan panjang 6 bytes (`char buffer[6]`), saya memiliki 3 data yang berbeda (masing-masing 1 byte) dan juga memiliki sebuah header 3 bytes bertuliskan 'its'. Bagaimana caranya menyatukan data tersebut kedalam char buffer yang hanya berkapasitas 6 bytes?
3. User input sebuah string dengan judul lagu yang paling disukai. Buat sebuah infinity loop yang nantinya akan membuat user input berupa posisi dan size yang akan digunakan untuk membuat string baru. Contoh lagu favorit adalah: `antara_ada_dan_tiada`, posisi = 3 dan size = 4 maka nanti akan nge-print `ara_` lalu input lagi posisi = 7 dan size = 2 maka keluar `ad` dst.. sampai diberi sinyal `SIGINT`
4. Apa sebenarnya string itu?

## Link penting
http://www.it.uom.gr/teaching/c_optimization/tutorial.html  
https://icps.u-strasbg.fr/~bastoul/local_copies/lee.html    

`Kalo bingung, tanya aja`
