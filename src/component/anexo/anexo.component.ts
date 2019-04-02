import { Component, Input, Output, EventEmitter, ViewChild, ElementRef, HostListener } from '@angular/core';
import { AlertController, Slides, ModalController } from 'ionic-angular';
import { ExpandPreviewPage } from './expand-preview/expand-preview';

@Component({
    selector: 'usi-anexo',
    templateUrl: 'anexo.component.html'
})
export class AnexoComponent {

    @Input() extensions: string; // String com a lista de extensoes permitidas

    @Input() limite: number; // Limite de arquivos

    @ViewChild('fileInput') fileInput: ElementRef;

    @ViewChild(Slides) slides: Slides;

    @Output() filesEvent = new EventEmitter<any>(); // Emitir evento

    files: { file: File, preview: any, isExpandable: boolean }[] = new Array; // Lista de arquivos

    slidesPerView: number; // Número de arquivos exibidos no slide

    pdfSrc;

    constructor(private _alertCtrl: AlertController, private _modalCtrl: ModalController,
        private _element: ElementRef) { }

    ngOnInit() {
        this.setSlidesPerView();

        if (this.extensions.indexOf("image/*")) {
            this.extensions = this.extensions.replace("image/*", ".png,.jpg,.jpeg,.bmp")
        }

    }

    @HostListener('window:resize')
    onResize() { // quando alterar o tamanho da pagina
        this.setSlidesPerView();
    }

    /**
     * Determina quantos itens ficarão visiveis no slider
     */
    setSlidesPerView() {

        let width = this._element.nativeElement.offsetWidth;

        if (width > 1200) this.slidesPerView = 5;
        else if (width > 768) this.slidesPerView = 4;
        else if (width > 400) this.slidesPerView = 2;
        else this.slidesPerView = 1;

        this.slides.update();

    }

    isBeginning(): boolean {
        return this.slides.isBeginning();
    }

    isEnd(): boolean {
        return this.slides.isEnd();
    }

    next() {
        this.slides.slideNext(500);
    }

    prev() {
        this.slides.slidePrev(500);
    }

    /**
     * Inclusão de arquivo(s) na lista
     * @param $event 
     */
    adicionarFiles($event): void {

        let invalidos;

        for (let file of $event.target.files) { // cada arquivo selecionado

            // Verificar limite (se existir)
            if (this.limite && this.limite == this.files.length) {

                let alertPopup = this._alertCtrl.create({
                    title: 'AVISO',
                    message: `O limite de anexos é de ${this.limite} arquivos.`,
                    buttons: ['OK'],
                    cssClass: "my-custom-alert my-alert-alerta"
                });

                alertPopup.present();

                break;
            }

            if (this.extensions && this.extensions.indexOf((/(?:\.([^.]+))?$/).exec(file.name)[1]) < 0) {

                if (!invalidos) invalidos = new Array();
                invalidos.push(file.name);
                continue;

            }

            // Adicionar na lista
            let index = this.files.push({ file: file, preview: "/assets/imgs/logo.png", isExpandable: false }) - 1;

            // Carregar miniatura
            if (file.type.indexOf("image") != -1) {

                let reader = new FileReader();
                reader.onload = (_event) => {
                    this.files[index].preview = reader.result;
                    this.files[index].isExpandable = true;
                }
                reader.readAsDataURL(file);

            }
            else if (file.type.indexOf("pdf") != -1) {
                this.files[index].preview = "/assets/imgs/download.png";
                this.files[index].isExpandable = true;
            }

        }

        if (invalidos) {

            let alertPopup = this._alertCtrl.create({
                title: 'AVISO',
                subTitle: `Não foi possível anexar o(s) seguinte(s) arquivo(s) por possuir(em) extensão inválida.`,
                message: this.montarMsgArquivosInvalidos(invalidos),
                buttons: ['OK'],
                cssClass: "my-custom-alert my-alert-alerta"
            });

            alertPopup.present();

        }

        // Emitir lista de arquivos para a tela principal
        this.filesEvent.emit(this.files);

        // Ir para o final dos slides
        setTimeout(() => {
            while (this.files.length > this.slidesPerView && !this.slides.isEnd()) {
                this.slides.slideNext();
            }
        }, 100);

    }

    /**
     * Remove arquivo da lista.
     * @param index Index no array
     */
    remover(index: number) {

        this.files.splice(index, 1); //remover

        this.filesEvent.emit(this.files); // emitir

        // Voltar um slide quando o último é removido (porém ignorando quando era um único slide)
        if (this.isEnd() && !this.isBeginning()) {
            setTimeout(() => { this.prev() }, 100);
        }

    }

    /**
     * Abrir arquivo clicado em um modal
     * @param file 
     */
    expand(selected: any) {

        let modal = this._modalCtrl.create(ExpandPreviewPage,
            {
                file: selected
            });

        modal.present();

    }

    open(selected: any) {

        let url = URL.createObjectURL(selected.file);
        window.open(url, "_blank");

    }

    private montarMsgArquivosInvalidos(invalidos: string[]): string {

        let msg = `<ul>`;

        for (let invalido of invalidos) {

            msg += `<li>${invalido}</li>`;

        }

        return msg + `</ul>`;

    }

}