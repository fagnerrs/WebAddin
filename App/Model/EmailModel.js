function EmailModel() {

    this.body = "";
    this.title = "";
    this.attached_files = [];
    this.from = "";
    this.to = [];
    this.cc = [];
    this.bcc = [];
    this.created_at = new Date();
    this.message_id = "";
    this.conversation_id = "";
}