import { Component, OnInit, Input } from "@angular/core";
import { MatDialogRef } from "@angular/material";
import { LabelService } from "src/app/services/label.service";
import { Label } from "src/app/models/label";

@Component({
  selector: "app-edit-label",
  templateUrl: "./edit-label.component.html",
  styleUrls: ["./edit-label.component.scss"]
})
export class EditLabelComponent implements OnInit {
  label: Label = new Label();
  token = localStorage.getItem("token");
  hitCancel: boolean;
  @Input() labelsList: Label[];

  constructor(
    private labelService: LabelService,
    private dialogRef: MatDialogRef<EditLabelComponent>
  ) {}

  ngOnInit() {}

  cancel() {
    this.hitCancel = true;
  }

  // createLabel() {
  //   console.log("Label creation: ", this.label.labelName);
  //   this.labelService.createLabel(this.label).subscribe(
  //     (response: any) => {
  //       console.log(response);
  //     },
  //     error => {
  //       console.log(error);
  //     }
  //   );
  // }

  // onSubmit() {
  //   this.dialogRef.close();
  //   if (this.label.labelName !== null) {
  //     this.labelService.createLabel(this.label).subscribe(
  //       (response: any) => {
  //         console.log(response);
  //       },
  //       error => {
  //         console.log(error);
  //       }
  //     );
  //   }
  // }
}
