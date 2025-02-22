import { Card } from "@/components/ui/card"
import { Id } from "../../../../convex/_generated/dataModel"
import { Avatar } from "@/components/ui/avatar"
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar"
import { Check, User, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import React from "react"
import { useMutationState } from "@/app/hook/useMutation"
import { api } from "../../../../convex/_generated/api"
import { toast } from "react-toastify"
import { ConvexError } from "convex/values"

interface Props {
    id: string;
  imageUrl: string;
  userName: string;
  email: string;
    
}
  const RequestComponent: React.FC<Props> = ({ id, imageUrl, userName, email }) => {
    const {mutate : denyRequest , pending : denyPending  } = useMutationState(api.request.deny)

    const _handleDenyRequest = (id : any) => {
        denyRequest({id}).then( () => {
            toast.success("Friend Request denied")
        }
        ).catch((err) => { 
            toast.error(err instanceof ConvexError ? err.data : "Unexpected error occured")
        })
    }
    return (
      <Card className="list-friend w-full p-2 flex flex-row items-center justify-between gap-2">
        <div className="flex item-center  gap-4 truncate">
          <Avatar>
            <AvatarImage src={imageUrl} />
            <AvatarFallback>
              <User />
            </AvatarFallback>
          </Avatar>
          <div className="inforOfUser flex flex-col truncate">
            <h4 className="truncate">{userName}</h4>
            <p className="text-xs text-muted-foreground truncate">{email}</p>
          </div>
        </div>
        <div className="flex items-center gap-2  md:pr-5 lg:pr-0">
          <Button className="btn-accept-Friend" size="icon" onClick={() => {}}>
            <Check />
          </Button>
          <Button
            className="btn-cancel "
            size="icon"
            variant="destructive"
            onClick={() => _handleDenyRequest({id})}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </Card>
    );
    }
export default RequestComponent; 
