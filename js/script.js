'use strict';

{
    function matchingCards() {

    let characters = [ //カードデータのオブジェクト
            { image: 'images/23073305.png', namae: 'Yamaha', age: 38, likes: 2, desc: 'はじめまして！数あるプロフの中から見ていただきありがとうございます！はじめまして！数あるプロフの中から見ていただきありがとうございます！' },
            { image: 'images/rekishicard.png', namae: 'Honda', age: 48, likes: 3, desc: 'このまま年賀全部キミに届けて全部年賀for you納めたlove you love youキミに届けこのまま年賀全部キミに届けて全部年賀for you納めたlove you love youキミに届け' },
            { image: 'images/cropYOSX9760.jpg', namae: 'Kawasaki', age: 32, likes: 1, desc: '吾輩は猫である名前はまだないどこで生まれたかトンと見当がつかぬなんでも薄暗いじめじめしたところでニャーニャー泣いていたことだけは覚えて記憶している吾輩はここで初めて人間というものを見た' },
            { image: 'images/cropIMGL5336.jpg', namae: 'Suzuki', age: 28, likes: 15, desc: 'はじめましてこんにちはご訪問ありがとうございます男の娘ですけどよろしくお願いします！はじめましてこんにちはご訪問ありがとうございます男の娘ですけどよろしくお願いします！' },
            { image: 'images/G-otacard.png', namae: 'Meguro', age: 67, likes: 18, desc: 'はじめまして、ニュータイプです。なんだろう、感じる……君も、ニュータイプなんだね？はじめまして、ニュータイプです。なんだろう、感じる……君も、ニュータイプなんだね？' },
            { image: 'images/ojisan06.png', namae: 'Motoguchi', age: 48, likes: 1, desc: 'はじめまして！(((o(*ﾟ▽ﾟ*)o)))訪問ありがとう(≧▽≦)僕と君の出会いに乾杯🍻なんちゃって(n*´ω`*n)はじめまして！(((o(*ﾟ▽ﾟ*)o)))訪問ありがとう(≧▽≦)僕と君の出会いに乾杯🍻なんちゃって(n*´ω`*n)' }
        ];

        class Card { //カードの個別生成クラス
            constructor(i, place) { //仮引数でカードインデックスと、カードの場所（メイン画面orモーダル）を指定
                this.card = document.createElement('div');
                this.card.classList.add('card');

                this.name = document.createElement('h2');
                this.name.classList.add('name');
                this.name.innerText = characters[i].namae;

                this.age = document.createElement('p');
                this.age.classList.add('age');
                if (characters[i].age < 0) { //カードの並び替えに年齢データを正の値・負の値と切り替えてflexのorderに入れているので
                    characters[i].age *= -1; //高齢者順の時は年齢データがマイナス値になってしまう、という事への対策
                    this.age.innerText = `(${characters[i].age})`;
                    characters[i].age *= -1; //年齢データをソートする方より手間が無いかと思ったが、わかりにくく手間も変わらないという結果に…
                } else {
                    this.age.innerText = `(${characters[i].age})`;
                }

                this.img = document.createElement('img');
                this.img.src = `${characters[i].image}`;

                this.desc = document.createElement('p');
                this.desc.classList.add('desc');
                this.desc.innerText = characters[i].desc;

                this.button = document.createElement('button');
                this.button.classList.add('likeBtn');
                if (characters[i].likes < 0) { //年齢順での並び替えと同様に、likes数を正負切り替えてorderに入れているため
                    characters[i].likes *= -1; //負の値を正に戻してからボタンのinnerTextとして代入
                    this.button.innerText = `${characters[i].likes} いいね！`;
                    characters[i].likes *= -1; //そのままだと他のキャラデータorderの負の値との整合性が無くなるので、再度負の値へ戻す
                } else {
                    this.button.innerText = `${characters[i].likes} いいね！`;
                }

                this.button.addEventListener('click', (e) => { //いいねボタンを押すといいねが増える
                    let like = characters[i].likes;
                    if (like < 0) { //likesデータをflexのorderに使いまわしているため。負の値の時は正に戻している
                        like *= -1;
                        like++;
                        this.button.textContent = `${like} いいね！`;
                        like *= -1;
                        characters[i].likes = like;
                    } else {
                        like++;
                        this.button.textContent = `${like} いいね！`;
                        characters[i].likes = like;
                    }
                    e.stopImmediatePropagation()
                });

                this.place = place;
                this.cardInner(); //コンストラクターで設定した値を基にカードをHTML上に生成

                this.card.addEventListener('click', (e) => { //カードクリックでモーダルがon/offするイベント
                    this.card.classList.add('currentCard');
                    if (this.place === 'modal') { //カードの場所がモーダルの場合の処理
                        updateLikeBtnText(); //モーダルカードのいいね数をメイン画面の同キャラカードに引き継ぐ処理
                        modalChange(); //モーダルのon/off
                        e.stopImmediatePropagation()
                        return
                    }
                    modalChange(); //モーダルのon/off
                    new Card(i, 'modal'); //引数でコンストラクターにcardSet関数のi値とカードの生成場所IDを指定
                });
            } //ここまでがコンストラクター

            cardInner() { //コンストラクターで設定した値を基に個別カードをHTML上に生成
                const cardPlace = document.getElementById(this.place);
                cardPlace.appendChild(this.card);
                this.card.appendChild(this.name);
                this.card.appendChild(this.age);
                this.card.appendChild(this.img);
                this.card.appendChild(this.desc);
                this.card.appendChild(this.button);
            }
        } //ここまでがCardクラス

        function cardsSet() { //個別カードをキャラデータの枚数分、セットしていく
            for (let i = 0; i < characters.length; i++) {
                new Card(i, 'cardsField'); 
            }//引数でコンストラクターにこの関数のi値（= i枚目のカード）とカードの生成場所IDを指定
        } cardsSet();

        function updateLikeBtnText() { //モーダルカードのいいね数をメイン画面の同キャラカードに引き継ぐ処理
            let currentBtn = document.querySelector('.currentCard').lastChild;
            let modalText = document.getElementById('modal').children[0].lastChild.textContent;
            //カードのクリックイベント発火時に付与したcurrentCardに対して、モーダルカードのいいね数を引き継ぐ
            currentBtn.textContent = modalText;
            document.querySelectorAll('.card').forEach(likeBtn => {
                likeBtn.classList.remove('currentCard');
            });
        } //カード内の構成要素が変わると、現在のカード構成要素に依存しているこの関数も書き換える必要があるので、処理の再考が必要

        function modalChange() { //モーダルのon/off
            const modal = document.getElementById('modal');
            const html = document.querySelector('html');
            const body = document.querySelector('body');
            const mask = document.getElementById('mask');
            modal.innerHTML = '';
            modal.classList.toggle('none');
            html.classList.toggle('hidden');
            body.classList.toggle('hidden');
            mask.classList.toggle('none');
        }

        function mask() { //モーダル表示時にマスクをクリックするとメイン画面に戻る処理
            const mask = document.getElementById('mask');
            mask.addEventListener('click', (e) => {
                updateLikeBtnText(); //モーダルカードのいいね数をメイン画面の同キャラカードに引き継ぐ処理
                modalChange(); //モーダルのon/off
                e.stopImmediatePropagation()
                return
            });
        } mask();

        class SortBtn { //年齢順、いいね数順でソートするボタンを生成
            constructor(ageOrLikes) { //仮引数でボタンの種類を判断
                this.sortBtn = document.createElement('div');
                this.sortBtn.classList.add(`${ageOrLikes}Btn`, 'btn');
                this.sortBtn.innerText = ageOrLikes;

                const sortButtons = document.getElementById('sortButtons');
                sortButtons.appendChild(this.sortBtn);

                this.sortBtn.addEventListener('click', () => { //いいね順or年齢順にソートするボタンイベント
                    document.querySelectorAll('.card').forEach((card, i) => {
                        let orderNum = characters[i][ageOrLikes];
                        orderNum *= -1; //-1を掛ける事で値の正負を切り替え
                        card.style.order = orderNum; //その値をflexのorderに代入して並び替え
                        characters[i][ageOrLikes] = orderNum;
                    }); //思い付きで実装してみたが、普通にsortする方が良いかも……
                });
            }
        }

        new SortBtn('age');
        new SortBtn('likes');
    }

    matchingCards();
}